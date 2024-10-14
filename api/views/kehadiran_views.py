from rest_framework import status
from rest_framework import exceptions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import get_authorization_header
from django.shortcuts import get_object_or_404

from ..models.kehadiran_models import Kehadiran
from ..models.user_models import User
from ..models.karyawan_models import Karyawan
from ..serializers import KehadiranSerializer
from ..authentication import decode_access_token

class KehadiranView(APIView):
    def get(self, request):
        auth_header = request.headers.get('Authorization')
        token = None

        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]  
        else:
            token = request.COOKIES.get('accessToken')  

        if not token:
             return Response({
                "error": "Token tidak ada, tolong masukkan token"
            })
        
        try:
            user_id = decode_access_token(token)
        except exceptions.AuthenticationFailed as e:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Pengecekan role pengguna
        if user.role in ['admin', 'manager']:
            presence = Kehadiran.objects.all()
        elif user.role == 'karyawan':
            karyawan = Karyawan.objects.filter(user=user).first()
            if not karyawan:
                return Response({'error': 'Karyawan data not found for this user'}, status=404)
            presence = Kehadiran.objects.filter(karyawan=karyawan)
        else:
            return Response({'error': 'Unauthorized role'}, status=403)

        serializer = KehadiranSerializer(presence, many=True)
        return Response(serializer.data)


class KehadiranCreate(APIView):
    def post(self, request):
        auth_header = request.headers.get('Authorization')
        token = None

        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]  
        else:
            token = request.COOKIES.get('accessToken')  

        if not token:
             return Response({
                "error": "Token tidak ada, tolong masukkan token"
            })
        
        try:
            user_id = decode_access_token(token)
        except exceptions.AuthenticationFailed as e:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)
        if not user:
            return Response({'error': 'User not found'}, status=404)

        if user.role in ['admin', 'manager']:
            karyawan_id = request.data.get('karyawan_id')
            if not karyawan_id:
                return Response({'error': 'Karyawan ID is required for admins and managers'}, status=400)

            karyawan = Karyawan.objects.filter(id=karyawan_id).first()
            if not karyawan:
                return Response({'error': 'Karyawan not found'}, status=404)
        
        elif user.role == 'karyawan':
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
        auth_header = request.headers.get('Authorization')
        token = None

        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]  
        else:
            token = request.COOKIES.get('accessToken')  

        if not token:
             return Response({
                "error": "Token tidak ada, tolong masukkan token"
            })
        
        try:
            user_id = decode_access_token(token)
        except exceptions.AuthenticationFailed as e:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)

        if user is None:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # Dapatkan id kehadiran dari URL kwargs
        kehadiran_id = kwargs.get('id')
        presence = get_object_or_404(Kehadiran, id=kehadiran_id)

        if user.role in ['admin', 'manager']:
            pass  
        elif user.role == 'karyawan':
            karyawan = Karyawan.objects.filter(user=user).first()
            if presence.karyawan != karyawan:
                return Response({
                    "error": "Anda tidak terdaftar untuk mengupdate data ini"
                }, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({"error": "Invalid user role"}, status=status.HTTP_403_FORBIDDEN)

        serializer = KehadiranSerializer(presence, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Berhasil update data",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

     
class KehadiranDelete(APIView):
     def put(self, request, *args, **kwargs):
        auth_header = request.headers.get('Authorization')
        token = None

        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]  
        else:
            token = request.COOKIES.get('accessToken')  

        if not token:
             return Response({
                "error": "Token tidak ada, tolong masukkan token"
            })
        
        try:
            user_id = decode_access_token(token)
        except exceptions.AuthenticationFailed as e:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)
    
        if user is None:
            return Response({"error": "User tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

        laporan_id = kwargs.get('id')
        report = get_object_or_404(LaporanGaji, id=laporan_id)

        if user.role in ['admin', 'manager']:
            pass
        else:
            return Response({"error": "Invalid user role"}, status=status.HTTP_403_FORBIDDEN)
        # autentikasi user mengunakan token END

        serializer = LaporanSerializer(report, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Berhasil update data",
                "data" : serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "errors" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
   