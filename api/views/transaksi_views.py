from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, exceptions
from rest_framework.authentication import get_authorization_header
from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import get_object_or_404
from datetime import date

from ..models import Transaction, User, Pinjaman
from ..authentication import decode_access_token
from ..serializers import TransactionSerializer


class TransactionView(APIView):
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
            transaction = Transaction.objects.all()
        elif user.role == 'karyawan':
            transaction = Transaction.objects.filter(user=user)
        else:
            return Response({
                "error": "Invalid user role"
            }, status=status.HTTP_403_FORBIDDEN)

        serializer = TransactionSerializer(transaction, many = True)
        return Response(serializer.data)
    
class TransactionCreate(APIView):
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

       request.data['tanggal_pembayaran'] = date.today()

       pinjaman_id = request.data.get('pinjaman_karyawan')
       if not pinjaman_id:
            return Response({"error": "ID pinjaman_karyawan tidak ditemukan"}, status=status.HTTP_400_BAD_REQUEST)
        
       pinjaman = get_object_or_404(Pinjaman, id=pinjaman_id)
       
       serializer = TransactionSerializer(data=request.data)

       if serializer.is_valid():
            serializer.save(pinjaman_karyawan=pinjaman)
            return Response({
                "message": "Berhasil menambah data",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
       return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class TransactionUpdate(APIView):
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

       if not user:
            return Response({'error': 'User not found'}, status=404)
    
       id = kwargs.get('id')
       transaction = get_object_or_404(Transaction, id=id)

       
       if user.role in ['admin', 'manager']:
             transaction = Transaction.objects.all()
       elif user.role == 'karyawan':
            transaction = Transaction.objects.filter(user=user)
       else:
            return Response({
                "error": "Invalid user role"
            }, status=status.HTTP_403_FORBIDDEN)

       serializer = TransactionSerializer(transaction, data=request.data, partial=True)
       if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Berhasil update data",
                "data" : serializer.data
            }, status=status.HTTP_200_OK)
       return Response({
            "errors" : serializer.errors
       }, status=status.HTTP_400_BAD_REQUEST)
    
class TransactionDelete(APIView):
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

       if not user:
            return Response({'error': 'User not found'}, status=404)
    
       id = kwargs.get('id')
       transaction = get_object_or_404(Transaction, id=id)

       
       if user.role in ['admin', 'manager']:
             transaction = Transaction.objects.all()
       elif user.role == 'karyawan':
            transaction = Transaction.objects.filter(user=user)
       else:
            return Response({
                "error": "Invalid user role"
            }, status=status.HTTP_403_FORBIDDEN)
       
       transaction.delete()
       return Response({
            "message" : "Berhasil menghapus data"
       }, status=status.HTTP_204_NO_CONTENT)

    
