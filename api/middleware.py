# middleware.py
import jwt
from django.conf import settings
from django.http import JsonResponse
from rest_framework import status

class JWTMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        token = request.COOKIES.get('jwt')

        if token:
            try:
                # Verifikasi token JWT
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                request.user_id = payload['id']  # Simpan user_id di request
            except jwt.ExpiredSignatureError:
                return JsonResponse({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)
            except jwt.InvalidTokenError:
                return JsonResponse({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

        return self.get_response(request)
    