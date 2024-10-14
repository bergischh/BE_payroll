from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import APIException, AuthenticationFailed
from rest_framework.authentication import get_authorization_header
from django.conf import settings
from rest_framework import status
from rest_framework import exceptions
from django.shortcuts import get_object_or_404
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
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
class UpdateUserView(APIView):
    def put(self, request, *args, **kwargs):
        # Autentikasi token
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2 and auth[0].lower() == b'bearer':
            token = auth[1].decode('utf-8')
        else:
            return Response({
                'error': 'Token tidak ada, tolong masukkan token untuk mengakses.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            user_id = decode_access_token(token)
        except exceptions.AuthenticationFailed:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        # Mendapatkan user berdasarkan token
        user = get_object_or_404(User, id=user_id)

        # Memastikan user yang ingin diperbarui adalah yang sedang login
        if user.id != kwargs['id']:  # Asumsi primary key dikirim sebagai argumen URL (e.g. /users/<id>/)
            return Response({'error': 'You can only update your own account.'}, status=403)

        # Memproses data update
        serializer = UsersSerializer(user, data=request.data, partial=True)  # `partial=True` memungkinkan update parsial
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'User data updated successfully',
                'data': serializer.data
            }, status=200)
        return Response({
            'errors': serializer.errors
        }, status=400)

    
class LoginView(APIView):
     def post(self, request):
        user = User.objects.filter(email=request.data['email']).first()

        if not user:
            raise APIException('Invalid credentials!')

        if not user.check_password(request.data['password']):
            raise APIException('Invalid credentials!')

        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        response = Response()

        response.set_cookie(key='refreshToken', value=refresh_token, httponly=True)
        response.data = {
            'message': 'Anda berhasil login',
            'token': access_token
        }

        return response
    
class RefreshAPIView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refreshToken')
        id = decode_refresh_token(refresh_token)
        access_token = create_access_token(id)
        return Response({
            'token': access_token
        })
    
class LogoutView(APIView):
     def post(self, _):
        response = Response()
        response.delete_cookie(key="refreshToken")
        response.data = {
            'message': 'success'
        }
        return response