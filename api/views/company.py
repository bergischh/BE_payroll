from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import get_object_or_404
from rest_framework import exceptions, status
from ..models import Karyawan, Company, Product, User
from ..serializers import KaryawanSerializer, ProductSerializer, CompanySerializer
from ..authentication import decode_access_token


class KaryawanList(APIView):
    def get(self, request):
        karyawan = Karyawan.objects.filter(user__role='karyawan')
        serializer = KaryawanSerializer(karyawan, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
## PRODUCT HANDLE ##
class ProductCreate(APIView):
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
        except AuthenticationFailed:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)

        if user.role not in ['admin', 'manager']:
            return Response({
                "error": "Invalid user role, You are not an admin or manager"
            }, status=status.HTTP_403_FORBIDDEN)            

        serializer = ProductSerializer(data=request.data)
    
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Berhasil menambah data",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class ProductList(APIView):
    def get(self, request):
        product = Product.objects.all()
        serializer = ProductSerializer(product, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class ProductUpdate(APIView):
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
                "error": "Anda tidak memiliki akses"
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        user = get_object_or_404(User, id=user_id)

        if user is None:
            return Response({
                "error": "User tidak ditemukan, silahkan coba dengan data yang valid"
            }, status=status.HTTP_404_NOT_FOUND)
        
        id = kwargs.get('id')
        products = get_object_or_404(Product, id=id)

        if user.role not in ['admin', 'manager']:
            return Response({
                "error": "Invalid user role, you are not an admin or manager"
            }, status=status.HTTP_403_FORBIDDEN)

        serializer = ProductSerializer(products, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Berhasil update data",
                "data" : serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "errors" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class ProductDelete(APIView):
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
        if user is None:
            return Response({
                "error": "User tidak ditemukan"
            }, status=status.HTTP_404_NOT_FOUND)

        id = kwargs.get('id')
        products = get_object_or_404(Product, id=id)

        if user.role in ['admin', 'manager']:
            return Response({
                "error": "Invalid user role"
            }, status=status.HTTP_403_FORBIDDEN)

        products.delete()
        return Response({
            "message" : "Berhasil menghapus data"
        }, status=status.HTTP_204_NO_CONTENT)
## PRODUCT HANDLE END ##


## RECRUITMENT HANDLE ##
class RecruitmentView(APIView):
    def get(self, request):
        recruitmnent = Karyawan.objects.all()
        serializer = KaryawanSerializer(recruitmnent, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class RecruitmentCreate(APIView):
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
        except AuthenticationFailed:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)

        if user.role not in ['admin', 'manager']:
            return Response({
                "error": "Invalid user role, You are not an admin or manager"
            }, status=status.HTTP_403_FORBIDDEN)            

        serializer = CompanySerializer(data=request.data)
    
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Berhasil menambah data",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST) 

class RecruitmentUpdate(APIView):
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
                "error": "Anda tidak memiliki akses"
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        user = get_object_or_404(User, id=user_id)

        if user is None:
            return Response({
                "error": "User tidak ditemukan, silahkan coba dengan data yang valid"
            }, status=status.HTTP_404_NOT_FOUND)
        
        id = kwargs.get('id')
        recruitment = get_object_or_404(Company, id=id)

        if user.role not in ['admin', 'manager']:
            return Response({
                "error": "Invalid user role, you are not an admin or manager"
            }, status=status.HTTP_403_FORBIDDEN)

        serializer = ProductSerializer(recruitment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Berhasil update data",
                "data" : serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "errors" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)  
    
class RecruitmentDelete(APIView):
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
        if user is None:
            return Response({
                "error": "User tidak ditemukan"
            }, status=status.HTTP_404_NOT_FOUND)

        id = kwargs.get('id')
        recruitment = get_object_or_404(Product, id=id)

        if user.role in ['admin', 'manager']:
            return Response({
                "error": "Invalid user role"
            }, status=status.HTTP_403_FORBIDDEN)

        recruitment.delete()
        return Response({
            "message" : "Berhasil menghapus data"
        }, status=status.HTTP_204_NO_CONTENT)
    
## RECRUITMENT HANDLE END ##

## BUTTON CONTROL RECRUITMENT ##
class ToggleCompanyStatus(APIView):
    def post(self, request, id):
        company = get_object_or_404(Company, id=id)
        company.is_active = not company.is_active  # Toggle the status
        company.save()
        
        return Response({
            "message": "Company display status updated successfully.",
            "is_active": company.is_active
        }, status=status.HTTP_200_OK)
## BUTTON CONTROL RECRUITMENT END ##

