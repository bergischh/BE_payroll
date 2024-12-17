from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, exceptions
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import get_authorization_header
from django.shortcuts import get_object_or_404
from ..models.tunjangan_models import Tunjangan
from ..models.user_models import User
from ..models.karyawan_models import Karyawan
from ..serializers import TunjanganSerializer
from ..authentication import decode_access_token

class TunjanganView(APIView):
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

        if user.role in ['admin', 'manager']:
            # Fetch all Tunjangan with associated Karyawan using select_related
            allowance = Tunjangan.objects.all().select_related('karyawan')  # Optimized query with related Karyawan
        elif user.role == 'karyawan':
            try:
                karyawan = user.karyawan_profiles
                allowance = Tunjangan.objects.filter(karyawan=karyawan).select_related('karyawan').distinct()
            except Karyawan.DoesNotExist:
                return Response({
                    "error": "Karyawan tidak ditemukan."
                }, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({
                "error": "Invalid user role"
            }, status=status.HTTP_403_FORBIDDEN)

        serializer = TunjanganSerializer(allowance, many=True)
        return Response(serializer.data)



    
class TunjanganCreate(APIView):
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

        if user.role not in ['admin', 'manager']:
            return Response({
                "error": "Invalid user role"
            }, status=status.HTTP_403_FORBIDDEN)

        serializer = TunjanganSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Berhasil menambah data",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
        
class TunjanganUpdate(APIView):
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
            return Response({
                "error": "User tidak ditemukan, silahkan coba dengan data yang valid"
            }, status=status.HTTP_404_NOT_FOUND)
        
        tunjangan_id = kwargs.get('id')
        allowance = get_object_or_404(Tunjangan, id=tunjangan_id)

        if user.role not in ['admin', 'manager']:
            return Response({
                "error": "Invalid user role"
            }, status=status.HTTP_403_FORBIDDEN)

        serializer = TunjanganSerializer(allowance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Berhasil update data",
                "data" : serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "errors" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class TunjanganDelete(APIView):
    def delete(self, request, *args, **kwargs):
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
            auth_user = get_object_or_404(User, id=user_id)
        except exceptions.AuthenticationFailed as e:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        target_id = kwargs.get('id')
        target_allowance = get_object_or_404(Tunjangan, id=target_id)

        if auth_user.role in ['admin', 'manager']:
            return Response({
                "error": "Invalid user role"
            }, status=status.HTTP_403_FORBIDDEN)

        target_allowance.delete()
        return Response({
            "message" : "Success delete data allowance!"
        }, status=status.HTTP_204_NO_CONTENT)
    