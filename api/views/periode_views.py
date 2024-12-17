from rest_framework import status, exceptions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import get_authorization_header
from django.shortcuts import get_object_or_404

from ..models.periode_models import PeriodeGaji
from ..models.user_models import User
from ..models.karyawan_models import Karyawan
from ..serializers import PeriodeSerializer
from ..authentication import decode_access_token


class PeriodeView(APIView):
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
            periode_gaji = PeriodeGaji.objects.all()
        elif user.role == 'karyawan':
            try:
                # Attempt to get the related Karyawan instance
                karyawan = user.karyawan_profiles
                periode_gaji = PeriodeGaji.objects.filter(laporanpenggajian__karyawan=karyawan).distinct()
            except Karyawan.DoesNotExist:
                return Response({
                    "error": "Karyawan tidak ditemukan."
                }, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({
                "error": "Invalid user role"
            }, status=status.HTTP_403_FORBIDDEN)
        
        serializer = PeriodeSerializer(periode_gaji, many = True)
        return Response(serializer.data)
    
class PeriodeCreate(APIView):
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
                "error": "Invalid user role, you are not an admin or manager"
            }, status=status.HTTP_403_FORBIDDEN)        
        
        serializer = PeriodeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Berhasil menambah data",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class PeriodeUpdate(APIView):
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
        
        periode_id = kwargs.get('id')
        periode = get_object_or_404(PeriodeGaji, id=periode_id)

        if user.role not in ['admin', 'manager']:
            return Response({
                "error": "Invalid user role, you are not an admin or manager"
            }, status=status.HTTP_403_FORBIDDEN)

        serializer = PeriodeSerializer(periode, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Berhasil update data",
                "data" : serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "errors" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class PeriodeDelete(APIView):
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
        except exceptions.AuthenticationFailed as e:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)
        
        if user is None:
            return Response({
                "error": "User tidak ditemukan"
            }, status=status.HTTP_404_NOT_FOUND)

        id = kwargs.get('id')
        periode= get_object_or_404(PeriodeGaji, id=id)

        if user.role not in ['admin', 'manager']:
            return Response({
                "error": "Unauthorized. Only admin or manager can delete records."
            }, status=status.HTTP_403_FORBIDDEN)
    

        periode.delete()
        return Response({
            "message" : "Success delete data periode!"
        }, status=status.HTTP_204_NO_CONTENT)

    

