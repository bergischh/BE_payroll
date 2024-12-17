from rest_framework import status
from rest_framework import exceptions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import get_authorization_header
from django.shortcuts import get_object_or_404

from ..models.karyawan_models import Karyawan
from ..models.user_models import User
from ..authentication import decode_access_token
from ..serializers import KaryawanSerializer


class KaryawanViews(APIView):
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
            karyawan = Karyawan.objects.all()
        elif user.role == 'karyawan':
            karyawan = Karyawan.objects.filter(user=user)
        else:
            return Response({
                "error": "Invalid user role"
            }, status=status.HTTP_403_FORBIDDEN)

        serializer = KaryawanSerializer(karyawan, many=True)
        return Response(serializer.data)

    
class KaryawanCreate(APIView):
   def post(self, request, *args, **kwrgs):
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

       if user.role not in ['admin', 'manager'] :
           return Response({
                "error": "Invalid user role"
            }, status=status.HTTP_403_FORBIDDEN)

       serializer = KaryawanSerializer(data=request.data)
       parser_classes = [MultiPartParser, FormParser]

       if serializer.is_valid():
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
        auth_header = request.headers.get('Authorization')
        token = None

        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]  
        else:
            token = request.COOKIES.get('accessToken')  

        if not token:
            return Response({
                "error": "Token tidak ada, tolong masukkan token"
            }, status=status.HTTP_401_UNAUTHORIZED)
          
        try:
            user_id = decode_access_token(token)
        except exceptions.AuthenticationFailed:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)
       
        user = get_object_or_404(User, id=user_id) 
        
        karyawan_id = kwargs.get('id')
        karyawan = get_object_or_404(Karyawan, id=karyawan_id)

        if user.role != 'admin' and karyawan.user_id != user.id:
            return Response({
                "error": "Anda tidak memiliki izin untuk mengedit data ini."
            }, status=status.HTTP_403_FORBIDDEN)
        
        serializer = KaryawanSerializer(karyawan, data=request.data, partial=True)
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
        except exceptions.AuthenticationFailed:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        target_id = kwargs.get('id')
        target_employee = get_object_or_404(Karyawan, id=target_id)

        if auth_user.role not in ['admin', 'manager']:
            return Response({
                "error": "Unauthorized. Only admin or manager can delete records."
            }, status=status.HTTP_403_FORBIDDEN)            

        target_employee.delete()
        return Response({
            "message": "Success delete data employee!"
        }, status=status.HTTP_204_NO_CONTENT)