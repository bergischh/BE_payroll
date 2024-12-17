from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import APIException, AuthenticationFailed
from rest_framework.authentication import get_authorization_header
from django.conf import settings
from rest_framework import status
from rest_framework import exceptions
from django.shortcuts import get_object_or_404, render
from ..serializers import UsersSerializer
from ..models import User
from ..authentication import create_access_token, create_refresh_token, decode_access_token, decode_refresh_token


class UserAPIView(APIView):
    def get(self, request):
        # Ambil token dari header atau cookies
        auth_header = request.headers.get('Authorization')
        token = None

        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]  
        else:
            token = request.COOKIES.get('accessToken')  

        if not token:
            return Response(
                {"error": "Token tidak ada, tolong masukkan token"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        try:
            user_id = decode_access_token(token)  # Decode token untuk mendapatkan ID pengguna
        except AuthenticationFailed:
            return Response(
                {"error": "Anda tidak memiliki akses."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Dapatkan data pengguna berdasarkan ID dari token
        user = get_object_or_404(User, id=user_id)

        # Logika berdasarkan peran pengguna
        if user.role in ['admin', 'manager']:
            users = User.objects.all()  # Admin dan Manager melihat semua pengguna
        elif user.role == 'karyawan':
            users = User.objects.filter(id=user.id)  # Karyawan hanya melihat data mereka sendiri
        else:
            return Response(
                {"error": "Peran pengguna tidak valid"},
                status=status.HTTP_403_FORBIDDEN
            )

        # Serialize data pengguna
        serializer = UsersSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RegisterView(APIView):
    def post(self, request):
        serializer = UsersSerializer(data=request.data)

        if serializer.is_valid():
            username = request.data.get('username')
            email = request.data.get('email')
            password = request.data.get('password')
            role = request.data.get('role')  
            confirm_password = request.data.get('confirm_password')

            if password != confirm_password:
                return Response({
                    'error': 'Passwords do not match'
                }, status=status.HTTP_400_BAD_REQUEST)

            if User.objects.filter(username=username).exists():
                return Response({
                    'error': 'Username already exists'
                }, status=status.HTTP_400_BAD_REQUEST)

            if User.objects.filter(email=email).exists():
                return Response({
                    'error': 'Email already exists'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            role = User.Role.CALON_KARYAWAN
            user = User.objects.create_user(username=username, role=role, email=email, password=password)
            user.save()

            user_serializer = UsersSerializer(user)

            return Response({
                "message": "Berhasil membuat akun",
                "data": user_serializer.data  
            }, status=status.HTTP_201_CREATED)

        return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserView(APIView):
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


        if user.role != "admin":
            return Response({'error': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)

        id = kwargs.get('id')
        users = get_object_or_404(User, id=id)
  
        serializer = UsersSerializer(users, data=request.data, partial=True)  
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'User data updated successfully',
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        
        return Response({
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class UserDelete(APIView):
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
        except exceptions.AuthenticationFailed:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)

        id = kwargs.get('id')
        user = get_object_or_404(User, id=id)

        if user.role not in ['admin', 'manager']:
            return Response({
                "error": "Invalid user role"
            }, status=status.HTTP_403_FORBIDDEN)

        user.delete()
        return Response({
            "message" : "Berhasil menghapus data"
        }, status=status.HTTP_204_NO_CONTENT)

class LoginView(APIView): 
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = User.objects.filter(username=username).first()

        if not user:
            raise APIException('Invalid credentials!')

        if not user.check_password(password):
            raise APIException('Invalid credentials!')

        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        response = Response({
            'message': 'Anda berhasil login',
            'role': user.role,
            'token': access_token,
        })

        response.set_cookie(
            key='accessToken', 
            value=access_token, 
            httponly=True, 
            secure=True, # Only for HTTPS; set secure=False for HTTP in development
            samesite='None',  # Important for cross-origin requests
        )   
        return response

     
class RefreshAPIView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('accessToken')
        id = decode_refresh_token(refresh_token)
        access_token = create_access_token(id)
        return Response({
            'token': access_token
        })
    
class LogoutView(APIView):
     def post(self, _):
        response = Response()
        response.delete_cookie(key="accessToken")
        response.data = {
            'message': 'success'
        }
        return response