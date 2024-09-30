from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from ..models.kehadiran_models import Kehadiran
from ..models.user_models import User
from ..models.karyawan_models import Karyawan
from ..serializers import KehadiranSerializer
from ..authentication import decode_access_token
from rest_framework.authentication import get_authorization_header
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import exceptions

class KehadiranView(APIView):
    def get(self, request):
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            user_id = decode_access_token(token)

            user = User.objects.filter(pk=user_id).first()
            if user is None :
                raise AuthenticationFailed('User not found')
            
        if user.role in ['admin', 'manager']:
            presence = Kehadiran.objects.all()
        else:
            presence = Kehadiran.objects.filter(karyawan=request.user.karyawan)  # Menggunakan karyawan

        serializer = KehadiranSerializer(presence, many=True)  # Pastikan ini adalah nama yang benar
        return Response(serializer.data)


class KehadiranCreate(APIView):
    def post(self, request):
        # Cek jika pengguna terautentikasi
        auth = get_authorization_header(request).split()
        token = None

        if auth and len(auth) == 2 and auth[0].lower() == b'bearer':
            token = auth[1].decode('utf-8')

        if not token:
            token = request.COOKIES.get('jwt')

        if token:
            try:
                user_id = decode_access_token(token)  # Mendapatkan user_id dari token
            except exceptions.AuthenticationFailed:
                return Response({'error': 'Authentication required'}, status=401)
        else:
            return Response({'error': 'Token not provided'}, status=401)
    
        user = User.objects.filter(id=user_id).first()
        if not user:
            return Response({'error': 'User not found'}, status=404)

        # Cek apakah user adalah admin, manager, atau karyawan
        if user.role in ['admin', 'manager']:
            # Admin dan manager bisa membuat kehadiran untuk karyawan manapun
            karyawan_id = request.data.get('karyawan_id')
            if not karyawan_id:
                return Response({'error': 'Karyawan ID is required for admins and managers'}, status=400)

            karyawan = Karyawan.objects.filter(id=karyawan_id).first()
            if not karyawan:
                return Response({'error': 'Karyawan not found'}, status=404)
        
        elif user.role == 'karyawan':
            # Karyawan hanya bisa membuat data kehadiran untuk diri sendiri
            karyawan = Karyawan.objects.filter(user=user).first()
            if not karyawan:
                return Response({'error': 'Karyawan data not found for this user'}, status=404)
        else:
            return Response({'error': 'Unauthorized role'}, status=403)

        # Validasi dan simpan data kehadiran
        serializer = KehadiranSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(karyawan=karyawan)
            return Response({
                "message": "Berhasil menambah data",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)

        return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class KehadiranUpdate(APIView):
     def put(self, request, *args, **kwargs):
        id = kwargs.get('id')
        presence = get_object_or_404(Kehadiran, id=id)

        if request.user.role in ['admin', 'manager'] or presence.user == request.user:
            serializer = KehadiranSerializer(presence, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    "message" : "Berhasil update data",
                    "data" : serializer.data
                }, status=status.HTTP_200_OK)
            return Response({
                "errors" : serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": "Anda tidak memiliki akses untuk memperbarui data ini"}, status=status.HTTP_403_FORBIDDEN)

     
class KehadiranDelete(APIView):
     def delete(self, request, *args, **kwargs):
        id = kwargs.get('id')
        presence = get_object_or_404(Kehadiran, id=id)

        if request.user.role in ['admin', 'manager'] or presence.user == request.user:
            presence.delete()
            return Response({
                "message" : "Berhasil menghapus data"
            }, status=status.HTTP_204_NO_CONTENT)
        return Response({"message": "Anda tidak memiliki akses untuk menghapus data ini"}, status=status.HTTP_403_FORBIDDEN)
