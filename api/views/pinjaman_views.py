from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, exceptions
from rest_framework.authentication import get_authorization_header
from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import get_object_or_404
from datetime import date

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
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        if user.role in ['admin', 'manager']:
            loan = Pinjaman.objects.all()
        elif user.role == 'karyawan':
            karyawan = Karyawan.objects.filter(user=user).first()
            if not karyawan:
                    return Response({'error': 'Karyawan data not found for this user'}, status=404)
            loan = Pinjaman.objects.filter(karyawan=karyawan)
        else:
            return Response({"error": "Invalid user role"}, status=status.HTTP_403_FORBIDDEN)
        
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
            return Response({"error": "Token tidak ada, tolong masukkan token"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            user_id = decode_access_token(token)
        except exceptions.AuthenticationFailed:
            return Response({"error": "Anda tidak memiliki akses."}, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)

        if user.role != 'karyawan':
            return Response({
                "error": "you don't have permissions, You are not a employee"
            }, status=status.HTTP_403_FORBIDDEN) 
        
        karyawan = Karyawan.objects.filter(user=user).first()

        if not karyawan:
            return Response({'error': 'Karyawan data not found for this user'}, status=404)
        
        serializer = PinjamanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(karyawan=karyawan)
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
            return Response({"error": "User tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

        id = kwargs.get('id')
        loan = get_object_or_404(Pinjaman, id=id)

        if user.role in ['admin', 'manager']:
            pass
        else:
            return Response({"error": "Invalid user role"}, status=status.HTTP_403_FORBIDDEN)

        loan.delete()
        return Response({
            "message" : "Success delete data loan!"
        }, status=status.HTTP_204_NO_CONTENT)

class PeminjamanApproval(APIView):
    def post(self, request, *args, **kwargs):
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

        if user.role not in ['admin', 'manager']:
            return Response({
                "error": "You don't have permissions, you are not an admin or manager"
            }, status=status.HTTP_403_FORBIDDEN)

        id = kwargs.get('id')
        action = request.data.get('action') 

        pinjaman = get_object_or_404(Pinjaman, id=id)

        if action == 'approve':
            pinjaman.is_approve = True
            pinjaman.tanggal_pinjaman = date.today()  # Set tanggal_pinjaman saat ini
            # Izinkan admin mengatur tenggat_pinjaman jika disediakan dalam request
            if 'tenggat_pinjaman' in request.data:
                pinjaman.tenggat_pinjaman = request.data['tenggat_pinjaman']
        elif action == 'reject':
            pinjaman.is_approve = False
        else:
            return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

        pinjaman.save()

        return Response({
            "message": f"Pinjaman {action}ed successfully",
            "is_approve": pinjaman.is_approve,
            "tanggal_pinjaman": pinjaman.tanggal_pinjaman,
            "tenggat_pinjaman": pinjaman.tenggat_pinjaman
        }, status=status.HTTP_200_OK)
