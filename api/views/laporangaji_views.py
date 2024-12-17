from rest_framework import status
from rest_framework import exceptions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import get_authorization_header
from django.shortcuts import get_object_or_404
from datetime import date

from ..models import LaporanGaji, Karyawan, User, Pinjaman, Tunjangan, PeriodeGaji
from ..serializers import LaporanSerializer
from ..authentication import decode_access_token

class LaporanGajiView(APIView):
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
            laporan = LaporanGaji.objects.all()
        elif user.role == 'karyawan':
            karyawan = get_object_or_404(Karyawan, user=user)
            laporan = LaporanGaji.objects.filter(karyawan=karyawan)
        else: 
            return Response({
                "error": "Invalid user role"
            }, status=status.HTTP_403_FORBIDDEN)
    
        serializer = LaporanSerializer(laporan, many=True)
        return Response(serializer.data) 


class LaporanGajiCreate(APIView):
    def post(self, request):
        auth_header = request.headers.get('Authorization')
        token = None

        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]  
        else:
            token = request.COOKIES.get('accessToken')  

        if not token:
            return Response({"error": "Token tidak ada, tolong masukkan token"})

        try:
            user_id = decode_access_token(token)
        except exceptions.AuthenticationFailed as e:
            return Response({"error": "Anda tidak memiliki akses."}, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)

        if user.role not in ['admin', 'manager']:
            return Response({"error": "Invalid user role, You are not an admin or manager"}, status=status.HTTP_403_FORBIDDEN)
        
        karyawan_id = request.data.get('karyawan')
        karyawan = get_object_or_404(Karyawan, id=karyawan_id)
        
        periode_gaji_id = request.data.get('periodegaji')
        periode_gaji = get_object_or_404(PeriodeGaji, id=periode_gaji_id) if periode_gaji_id else None

        tunjangan = Tunjangan.objects.filter(karyawan=karyawan).first()
        pinjaman = Pinjaman.objects.filter(karyawan=karyawan).first()

        laporan_data = {
            "tanggal_gaji": date.today(),
            "gaji_mentah": request.data.get('gaji_mentah'),
            "gaji_total": request.data.get('gaji_total'),
            "jumlah_izin": request.data.get('jumlah_izin', 0),
            "jumlah_sakit": request.data.get('jumlah_sakit', 0),
            "pinjaman": pinjaman.id if pinjaman else None,
            "tunjangan": tunjangan.id if tunjangan else None,
            "periodegaji": periode_gaji.id if periode_gaji else None,
            "karyawan": karyawan.id,
        }

        serializer = LaporanSerializer(data=laporan_data)
        if serializer.is_valid():
            serializer.save(karyawan=karyawan)
            return Response({"message": "Berhasil menambah data", "data": serializer.data}, status=status.HTTP_201_CREATED)
        
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class LaporanGajiUpdate(APIView):
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

        if user is None:
            return Response({"error": "User tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

        laporan_id = kwargs.get('id')
        report = get_object_or_404(LaporanGaji, id=laporan_id)

        if user.role not in ['admin', 'manager']:
            return Response({
                "error": "Invalid user role, You are not an admin or manager"
            }, status=status.HTTP_403_FORBIDDEN)
        # autentikasi user mengunakan token END

        serializer = LaporanSerializer(report, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message" : "Berhasil update data",
                "data" : serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "errors" : serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class LaporanGajiDelete(APIView):
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
        except exceptions.AuthenticationFailed as e:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        target_id = kwargs.get('id')
        target_report = get_object_or_404(LaporanGaji, id=target_id)

        if auth_user.role not in ['admin', 'manager']:
            return Response({"error": "Unauthorized. Only admin or manager can delete records."}, status=status.HTTP_403_FORBIDDEN)

        target_report.delete()
        return Response({
            "message": "Success detelet data salary report!"
        }, status=status.HTTP_204_NO_CONTENT)
