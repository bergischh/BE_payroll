from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, exceptions
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from ..models.calonkaryawan_models import CalonKaryawan
from rest_framework.permissions import IsAuthenticated
from ..models import User, Karyawan
from ..serializers import CalonKaryawanSerializer
from ..authentication import decode_access_token

class CalonKaryawanView(APIView):
    def get(self, request):
        candidate = CalonKaryawan.objects.all()
        serializer = CalonKaryawanSerializer(candidate, many = True)
        return Response(serializer.data)
    
class CalonKaryawanCreate(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        serializer = CalonKaryawanSerializer(data=request.data)
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
        id = kwargs.get('id')
        candidate = get_object_or_404(CalonKaryawan, id=id)

        candidate.delete()
        return Response({
            "message" : "Berhasil menghapus data"
        }, status=status.HTTP_204_NO_CONTENT)
    

class CalonKaryawanAccept(APIView):
    def post(self, request):
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

        # Mengambil ID calon karyawan dari request data
        id = request.data.get('id')
        candidate = get_object_or_404(CalonKaryawan, id=id)

        # Mengupdate status wawancara calon karyawan
        candidate.status_wawancara = CalonKaryawan.StatusWawancara.diterima
        candidate.save()

        # Mengupdate role user menjadi 'karyawan'
        user.role = 'karyawan'
        user.save()

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
            user=user, 
            department=None,
            foto = candidate.photo
        )

        candidate.delete()

        return Response({
            "message": "Karyawan berhasil diterima",
            "data": {
                "candidate": CalonKaryawanSerializer(candidate).data,
                "user_id": user.id,
                "karyawan_id": karyawan.id
            }
        }, status=status.HTTP_201_CREATED)
    
class CalonKaryawanReject(APIView):
    def post(self, request, *args, **kwargs):
        id = kwargs.get('id')  
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