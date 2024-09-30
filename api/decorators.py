from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from functools import wraps
import jwt
from django.conf import settings

def jwt_required(f):
    @wraps(f)
    def decorated_function(self, request, *args, **kwargs):
        token = request.COOKIES.get('jwt')
        
        if not token:
            raise AuthenticationFailed('Authentication required')  # Gunakan DRF's exception handling

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            request.user_id = payload['id']  # Simpan user_id di request
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired!')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid token!')
        
        return f(self, request, *args, **kwargs)
    
    return decorated_function
