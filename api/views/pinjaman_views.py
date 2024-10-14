from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, exceptions
from rest_framework.authentication import get_authorization_header
from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import get_object_or_404

from ..models.pinjaman_models import Pinjaman
from ..models.user_models import User
from ..models.karyawan_models import Karyawan
from ..serializers import PinjamanSerializer
from ..authentication import decode_access_token

class PinjamanView(APIView):
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
            loan = Pinjaman.objects.all()
        elif user.role == 'karyawan':
            try:
                # Attempt to get the related Karyawan instance
                karyawan = user.karyawan_profiles
                loan = Pinjaman.objects.filter(laporanpenggajian__karyawan=karyawan).distinct()
            except Karyawan.DoesNotExist:
                return Response({
                    "error": "Karyawan tidak ditemukan."
                }, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({
                "error": "Invalid user role"
            }, status=status.HTTP_403_FORBIDDEN)
        
        serializer = PinjamanSerializer(loan, many = True)
        return Response(serializer.data)
    
class PinjamanCreate(APIView):
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

        if user.role != 'karyawan':
            return Response({
                "error": "you don't have permissions, You are not a employee"
            }, status=status.HTTP_403_FORBIDDEN) 
    
        serializer = PinjamanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Berhasil menambah data",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class PinjamanUpdate(APIView):
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

        if user.role != 'karyawan':
            return Response({
                "error": "you don't have permissions, You are not a employee"
            }, status=status.HTTP_403_FORBIDDEN) 
   
        loan_id = kwargs.get('id')
        loan = get_object_or_404(Pinjaman, id=loan_id)

        serializer = PinjamanSerializer(loan, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Berhasil update data",
                "data" : serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "errors" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
   
class PinjamanDelete(APIView):
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

        loan_id = kwargs.get('id')
        loan = get_object_or_404(Pinjaman, id=loan_id)

        if user.role in ['admin', 'manager']:
            return Response({
                "error": "Invalid user role"
            }, status=status.HTTP_403_FORBIDDEN)
    
        loan.delete()
        return Response({
            "message" : "Berhasil menghapus data"
        }, status=status.HTTP_204_NO_CONTENT)