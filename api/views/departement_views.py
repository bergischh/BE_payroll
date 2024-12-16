from rest_framework import status, exceptions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import get_authorization_header
from django.shortcuts import get_object_or_404

from ..models.departement_models import Departement
from ..models.user_models import User
from ..serializers import DepartementSerializer
from ..authentication import decode_access_token


class DepartementView(APIView):
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
        except AuthenticationFailed:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)

        # Admin dan Manager dapat mengakses semua data departemen
        if user.role in ['admin', 'manager']:
            departments = Departement.objects.all()
        # Karyawan hanya bisa melihat departemen terkait
        elif user.role == 'karyawan':
            departments = Departement.objects.filter(karyawan_profiles__user=user)  # Sesuaikan dengan relasi yang benar
        else:
            return Response({
                "error": "Invalid user role"
            }, status=status.HTTP_403_FORBIDDEN)

        serializer = DepartementSerializer(departments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class DepartementCreate(APIView):
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
        except exceptions.AuthenticationFailed:
            return Response({
                "error": "Anda tidak memiliki akses"
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        user = get_object_or_404(User, id=user_id)

        if user.role not in ['admin', 'manager']:
            return Response({
                "error": "Invalid user role, You are not an admin or manager"
            }, status=status.HTTP_403_FORBIDDEN)            

        serializer = DepartementSerializer(data=request.data)
    
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Berhasil menambah data",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class DepartmentUpdate(APIView):
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
        except exceptions.AuthenticationFailed:
            return Response({
                "error": "Anda tidak memiliki akses"
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        user = get_object_or_404(User, id=user_id)

        if user is None:
            return Response({
                "error": "User tidak ditemukan, silahkan coba dengan data yang valid"
            }, status=status.HTTP_404_NOT_FOUND)
        
        department_id = kwargs.get('id')
        departments = get_object_or_404(Departement, id=department_id)

        if user.role not in ['admin', 'manager']:
            return Response({
                "error": "Invalid user role, you are not an admin or manager"
            }, status=status.HTTP_403_FORBIDDEN)

        serializer = DepartementSerializer(departments, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Berhasil update data",
                "data" : serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "errors" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class DepartmentDelete(APIView):
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
        except exceptions.AuthenticationFailed:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)
        if user is None:
            return Response({
                "error": "User tidak ditemukan"
            }, status=status.HTTP_404_NOT_FOUND)

        department_id = kwargs.get('id')
        departments = get_object_or_404(Departement, id=department_id)

        if user.role not in ['admin', 'manager']:
            return Response({
                "error": "Invalid user role"
            }, status=status.HTTP_403_FORBIDDEN)

        departments.delete()
        return Response({
            "message" : "Berhasil menghapus data"
        }, status=status.HTTP_204_NO_CONTENT)