from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, exceptions
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from django.core.files.storage import default_storage
from ..models.calonkaryawan_models import CalonKaryawan
from rest_framework.permissions import IsAuthenticated
from ..models import User, Karyawan
from ..serializers import CalonKaryawanSerializer
from ..authentication import decode_access_token
from ..models.karyawan_models import foto_karyawan_directory_path

class CalonKaryawanView(APIView):
    def get(self, request):
        candidate = CalonKaryawan.objects.all()
        serializer = CalonKaryawanSerializer(candidate, many = True)
        return Response(serializer.data)
    
class CalonKaryawanDetail(APIView):
    def get(self, request, id):
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

        try:
            if user.role in ['admin', 'manager']:
                candidate = CalonKaryawan.objects.get(id=id)
            elif user.role == 'calon_karyawan':
                candidate = CalonKaryawan.objects.get(id=id, user=user)
            else:
                return Response({
                    "error": "Invalid user role"
                }, status=status.HTTP_403_FORBIDDEN)
        except CalonKaryawan.DoesNotExist:
            return Response({
                "error": "Calon Karyawan tidak ditemukan"
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = CalonKaryawanSerializer(candidate)
        return Response(serializer.data)


# class CalonKaryawanDetail(APIView):
#     def get(self, id):

    
class CalonKaryawanCreate(APIView):
    parser_classes = [MultiPartParser, FormParser]

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
            })
        
       try:
            user_id = decode_access_token(token)
       except exceptions.AuthenticationFailed as e:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)
       
       user = get_object_or_404(User, id=user_id) 

       if user.role != 'calon_karyawan' :
         return Response({
                "error": "Invalid user role"
         }, status=status.HTTP_403_FORBIDDEN)
       
         # Tambahkan `user` langsung ke data sebelum validasi
       data = request.data.dict()  # Ubah ke dict agar dapat dimodifikasi
       data['user'] = user.id  # Masukkan ID user ke dalam data

       serializer = CalonKaryawanSerializer(data=data)
       if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Berhasil menambah data",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
       return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    
class CalonKaryawanUpdate(APIView):
    def put(self, request, *args, **kwargs):
        id = kwargs.get('id')
        candidate = get_object_or_404(CalonKaryawan, id=id)

        serializer = CalonKaryawanSerializer(candidate, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Berhasil update data",
                "data" : serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "errors" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class CalonKaryawanDelete(APIView):
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
            auth_user = get_object_or_404(User, id=user_id)  
        except exceptions.AuthenticationFailed:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        target_id = kwargs.get('id')
        target_candidate = get_object_or_404(CalonKaryawan, id=target_id)

        if auth_user.role not in ['admin', 'manager']:
            return Response({
                "error": "Unauthorized. Only admin or manager can delete records."
            }, status=status.HTTP_403_FORBIDDEN)     

        target_candidate.delete()
        return Response({
            "message" : "Success delete data candidate!"
        }, status=status.HTTP_204_NO_CONTENT)
    

class CalonKaryawanAccept(APIView):
    def post(self, request, id):
        # Mengambil token dari header Authorization
        auth_header = request.headers.get('Authorization')
        token = None

        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]  
        else:
            token = request.COOKIES.get('accessToken')  

        # Memastikan token ada
        if not token:
            return Response({
                "error": "Token tidak ada, tolong masukkan token"
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            user_id = decode_access_token(token)  # Decode token untuk mendapatkan user_id
        except exceptions.AuthenticationFailed:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)  # Mendapatkan user berdasarkan user_id dari token

        if user.role not in ['admin', 'manager']:
            return Response({
                "error": "Anda tidak memiliki izin untuk mengakses endpoint ini."
            }, status=status.HTTP_403_FORBIDDEN)

        # Mengambil ID calon karyawan dari url
        candidate = get_object_or_404(CalonKaryawan, id=id)

          # Memindahkan foto calon karyawan ke folder 'foto_karyawan'
        if candidate.photo:
            # Mendapatkan path file foto yang lama
            old_photo_path = candidate.photo.path
            # Menyimpan foto dengan path baru di folder foto_karyawan
            new_photo_path = default_storage.save(foto_karyawan_directory_path(candidate, candidate.photo.name), candidate.photo)
            # Mengupdate field foto di calon karyawan
            candidate.photo.name = new_photo_path

        # Mengupdate role user menjadi 'karyawan'
        candidate.user.role = 'karyawan'
        candidate.user.save()

        # Mengimpor data ke tabel Karyawan
        karyawan = Karyawan.objects.create(
            nik=candidate.nik,
            nama_karyawan=candidate.nama_karyawan,
            # email=candidate.email,
            tempat_lahir=candidate.tempat_lahir,
            tanggal_lahir=candidate.tanggal_lahir,
            jenis_kelamin=candidate.jenis_kelamin,
            agama=candidate.agama,
            status=candidate.status,
            jumlah_anak=candidate.jumlah_anak,
            alamat=candidate.alamat,
            no_telephone=candidate.no_telephone,
            jabatan=None, 
            department=None,
            user=candidate.user, 
            foto = candidate.photo
        )

         # Mengupdate status wawancara calon karyawan
        candidate.status_wawancara = CalonKaryawan.StatusWawancara.diterima
        candidate.save()

        return Response({
            "message": "Karyawan berhasil diterima",
            "data": {
                "candidate": CalonKaryawanSerializer(candidate).data,
                "user_id": candidate.user.id,
                "karyawan_id": karyawan.id
            }
        }, status=status.HTTP_201_CREATED)
    
class CalonKaryawanReject(APIView):
    def post(self, request, id):
         # Mengambil token dari header Authorization
        auth_header = request.headers.get('Authorization')
        token = None

        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]  
        else:
            token = request.COOKIES.get('accessToken')  

        # Memastikan token ada
        if not token:
            return Response({
                "error": "Token tidak ada, tolong masukkan token"
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            user_id = decode_access_token(token)  # Decode token untuk mendapatkan user_id
        except exceptions.AuthenticationFailed:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)  # Mendapatkan user berdasarkan user_id dari token

        if user.role not in ['admin', 'manager']:
            return Response({
                "error": "Anda tidak memiliki izin untuk mengakses endpoint ini."
            }, status=status.HTTP_403_FORBIDDEN)
        
        candidate = get_object_or_404(CalonKaryawan, id=id)  

        candidate.status_wawancara = CalonKaryawan.StatusWawancara.tidak_diterima
        candidate.save()  

        return Response({
            "message": "Calon karyawan telah ditolak.",
            "data": {
                "id": candidate.id,
                "nama_karyawan": candidate.nama_karyawan,
                "status_wawancara": candidate.status_wawancara,
            }
        }, status=status.HTTP_200_OK)