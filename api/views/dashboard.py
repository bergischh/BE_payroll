from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import get_object_or_404
from rest_framework import exceptions, status
from django.db.models import Sum
from ..models import User, Karyawan, Kehadiran, Pinjaman, CalonKaryawan, Tunjangan, LaporanGaji
from ..authentication import decode_access_token

class AdminandManagerDashboard(APIView):
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
        except AuthenticationFailed:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)

        if user.role != 'admin':
            return Response({"errors" : "Invalid user role"}, status=status.HTTP_403_FORBIDDEN)

        total_karyawan = Karyawan.objects.count()
        total_recruitment = CalonKaryawan.objects.count()
        # pending_kehadiran = list(Kehadiran.objects.filter(is_approved=None).values())
        total_pinjaman = Pinjaman.objects.aggregate(Sum('jumlah_pinjaman'))['jumlah_pinjaman__sum'] or 0

        tunjangan_totals = Tunjangan.objects.aggregate(
            total_makan=Sum('tunjangan_makan'),
            total_kesehatan=Sum('tunjangan_kesehatan'),
            total_jabatan=Sum('tunjangan_jabatan'),
            total_thr=Sum('THR'),
            total_bonus=Sum('bonus')
        )

        jumlah_tunjangan = sum(value or 0 for value in tunjangan_totals.values())

        data = {
            'total_karyawan': total_karyawan,
            'total_recruitment': total_recruitment,
            'total_pinjaman': total_pinjaman,
            # 'pending_kehadiran': pending_kehadiran,
            'total_tunjangan': jumlah_tunjangan
        }
        return Response({
            "message": "Berhasil mengambil data",
            "data": data
        }, status=status.HTTP_200_OK)
    

class KaryawanDashboard(APIView):
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
        except AuthenticationFailed:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)

        if user.role != 'karyawan':
            return Response({"errors" : "Invalid user role"}, status=status.HTTP_403_FORBIDDEN)

        karyawan = get_object_or_404(Karyawan, user=user)
        kehadiran_total = Kehadiran.objects.filter(karyawan=karyawan).count()
        kehadiran_masuk = Kehadiran.objects.filter(karyawan=karyawan, keterangan_kehadiran='masuk').count()
        kehadiran_sakit = Kehadiran.objects.filter(karyawan=karyawan, keterangan_kehadiran='sakit').count()
        kehadiran_izin = Kehadiran.objects.filter(karyawan=karyawan, keterangan_kehadiran='izin').count()

        persentase_kehadiran = (kehadiran_masuk / kehadiran_total * 100) if kehadiran_total > 0 else 0
        total_pinjaman = LaporanGaji.objects.filter(karyawan=karyawan).aggregate(Sum('pinjaman__jumlah_pinjaman'))['pinjaman__jumlah_pinjaman__sum'] or 0

        total_tunjangan = LaporanGaji.objects.filter(karyawan=karyawan).aggregate(
            total_makan=Sum('tunjangan__tunjangan_makan'),
            total_kesehatan=Sum('tunjangan__tunjangan_kesehatan'),
            total_jabatan=Sum('tunjangan__tunjangan_jabatan'),
            total_thr=Sum('tunjangan__THR'),
            total_bonus=Sum('tunjangan__bonus')
        )

        jumlah_tunjangan = sum(value or 0 for value in total_tunjangan.values())

        data = {
            'persentase_kehadiran': persentase_kehadiran,
            'kehadiran_sakit': kehadiran_sakit,
            'kehadiran_izin': kehadiran_izin,
            'total_pinjaman': total_pinjaman,
            'total_tunjangan': jumlah_tunjangan,
        }
        return Response(data, status=status.HTTP_200_OK)
    
class calonKaryawanDashboard(APIView):
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
        except AuthenticationFailed:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)

        if user.role != 'calon_karyawan':
            return Response({"errors" : "Invalid user role"}, status=status.HTTP_403_FORBIDDEN)

        calon_karyawan = get_object_or_404(CalonKaryawan, user=user)
        data = {
            "nama": calon_karyawan.nama_calonKaryawan,
            "email": calon_karyawan.email,
            "status_wawancara": calon_karyawan.get_status_wawancara_display(),
        }

        return Response(data, status=status.HTTP_200_OK)
    
