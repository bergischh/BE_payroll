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
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            id = decode_access_token(token)

            user = User.objects.filter(pk=id).first()

            return Response(UsersSerializer(user).data)

        raise AuthenticationFailed('unauthenticated')
    

class RegisterView(APIView):
    def post(self, request):
        serializer = UsersSerializer(data=request.data)

        if serializer.is_valid():
            username = request.data.get('username')
            email = request.data.get('email')
            password = request.data.get('password')
            role = request.data.get('role')  
            confirm_password = request.POST.get('confirm_password')

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

            if not role:
                return Response({
                    'error': 'Role is required'
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

        # Check if the current user is an admin
        if not user.is_staff:  # Assuming is_staff indicates admin status
            return Response({'error': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)

        # Fetch the user to be updated
        user_to_update = get_object_or_404(User, id=kwargs['id'])

        # Remove username and password from request data if they exist
        if 'username' in request.data:
            del request.data['username']
        if 'password' in request.data:
            del request.data['password']

        # Memproses data update
        serializer = UsersSerializer(user_to_update, data=request.data, partial=True)  
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'User data updated successfully',
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        
        return Response({
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView): 
     def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = User.objects.filter(email=email).first()

        if not user:
            raise APIException('Invalid credentials!')

        if not user.check_password(password):
            raise APIException('Invalid credentials!')

        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        response = Response({
            'message': 'Anda berhasil login',
            'token': access_token
        })

        response.set_cookie(key='accessToken', value=access_token, httponly=True)

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