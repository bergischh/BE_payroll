from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.shortcuts import get_object_or_404
from ..models.karyawan_models import Karyawan
from ..models.user_models import User
from ..serializers import KaryawanSerializer
from rest_framework.authentication import get_authorization_header
from rest_framework.exceptions import APIException, AuthenticationFailed
from ..authentication import decode_access_token
from rest_framework import exceptions


class KaryawanViews(APIView):
    def get(self, request):
        # Ambil token dari Authorization header
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            user_id = decode_access_token(token)  # Decode token untuk mendapatkan user_id
            
            # Ambil pengguna berdasarkan user_id
            user = User.objects.filter(pk=user_id).first()
            if user is None:
                raise AuthenticationFailed('User not found')

            # Cek apakah user memiliki role admin atau manager
            if user.role in ['admin', 'manager']:
                # Jika role admin atau manager, ambil semua data karyawan
                karyawan = Karyawan.objects.all()
            else:
                # Jika bukan, ambil hanya data karyawan milik pengguna tersebut
                karyawan = Karyawan.objects.filter(user=user)

            serializer = KaryawanSerializer(karyawan, many=True)
            return Response(serializer.data)

        raise AuthenticationFailed('unauthenticated')
    
class KaryawanCreate(APIView):
   def post(self, request, *args, **kwrgs):
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
       
        # Ambil user berdasarkan user_id
       user = User.objects.filter(id=user_id).first()
       if not user:
            return Response({'error': 'User not found'}, status=404)

        # Parse data dari request
       serializer = KaryawanSerializer(data=request.data)
       parser_classes = [MultiPartParser, FormParser]

       if serializer.is_valid():
            # Set user secara otomatis ke dalam Karyawan
            serializer.save(user=user)
            return Response({
                "message": "Berhasil menambah data karyawan",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        
       return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class KaryawanUpdate(APIView):
    def put(self, request, *args, **kwargs):
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            user_id = decode_access_token(token)
        else : 
            raise AuthenticationFailed('unauthenticated')
        
        user = User.objects.filter(pk=user_id).first()
        if user is None:
            raise AuthenticationFailed('user not found')
        
        Karyawan_id = kwargs.get('id')
        employees = get_object_or_404(Karyawan, id=Karyawan_id)

        if user.role in ['admin', 'manager']:
            pass
        elif user.role == 'karyawan':
            if employees.user != user:
                return Response({
                    "error": "Anda tidak terdaftar untuk mengaupdate data ini" 
                }, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({
                "error": "invalid user role"
            },status=status.HTTP_403_FORBIDDEN)
        
        serializer = KaryawanSerializer(employees, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Berhasil update data",
                "data" : serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "errors" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class KaryawanDelete(APIView):
    def delete(self, request, *args, **kwargs):
        auth = get_authorization_header(request).split()
        id = kwargs.get('id')
        departments = get_object_or_404(Karyawan, id=id)

        departments.delete()
        return Response({
            "message" : "Berhasil menghapus data"
        }, status=status.HTTP_204_NO_CONTENT)