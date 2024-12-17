from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, exceptions
from rest_framework.exceptions import APIException
from rest_framework.authentication import get_authorization_header
from django.shortcuts import get_object_or_404

from ..models.slipgaji_models import SlipGaji
from ..models.user_models import User
from ..models.karyawan_models import Karyawan
from ..serializers import SlipGajiSerializer
from ..authentication import decode_access_token

class SlipGajiView(APIView):
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
            salipgaji = SlipGaji.objects.all()
        elif user.role == 'karyawan':
            karyawan = get_object_or_404(Karyawan, user=user)
            salipgaji = SlipGaji.objects.filter(karyawan=karyawan)
        else: 
            return Response({
                "error": "Invalid user role"
            }, status=status.HTTP_403_FORBIDDEN)
        
        serializer = SlipGajiSerializer(salipgaji, many = True)
        return Response(serializer.data)
    
class SlipGajiCreate(APIView):
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
                "error": "Invalid user role, You are not an admin or manager"
            }, status=status.HTTP_403_FORBIDDEN)
        
        karyawan_id = request.data.get('karyawan')
        karyawan = get_object_or_404(Karyawan, id=karyawan_id)

        serializer = SlipGajiSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(karyawan=karyawan)
            return Response({
                "message": "Berhasil menambah data",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class SlipGajiUpdate(APIView):
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

        slipgaji_id = kwargs.get('id')
        slipgaji = get_object_or_404(SlipGaji, id=slipgaji_id)

        if user.role not in ['admin', 'manager']:
            return Response({
                "error": "Invalid user role, You are not an admin or manager"
            }, status=status.HTTP_403_FORBIDDEN)
        # autentikasi user mengunakan token END

        serializer = SlipGajiSerializer(slipgaji, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Berhasil update data",
                "data" : serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "errors" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class SlipGajiDelete(APIView):
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

        id = kwargs.get('id')
        salarySlip = get_object_or_404(SlipGaji, id=id)

        # Cek apakah user adalah admin atau manager
        if user.role not in ['admin', 'manager']:
            return Response({"error": "Unauthorized. Only admin or manager can delete records."}, status=status.HTTP_403_FORBIDDEN)

        salarySlip.delete()
        return Response({
            "message" : "Success delete data salary slip!"
        }, status=status.HTTP_204_NO_CONTENT)