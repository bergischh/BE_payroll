from rest_framework import status
from rest_framework import exceptions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import get_authorization_header
from django.shortcuts import get_object_or_404
from django.db.models import Count, Q
from datetime import datetime
from calendar import monthrange

from ..models.kehadiran_models import Kehadiran
from ..models.user_models import User
from ..models.karyawan_models import Karyawan
from ..serializers import KehadiranSerializer
from ..authentication import decode_access_token

class KehadiranView(APIView):
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
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        if user.role in ['admin', 'manager']:
            presence = Kehadiran.objects.select_related('karyawan').filter(is_approved=True)
        elif user.role == 'karyawan':
            karyawan = Karyawan.objects.filter(user=user).first()
            if not karyawan:
                return Response({'error': 'Karyawan data not found for this user'}, status=404)
            presence = Kehadiran.objects.filter(karyawan=karyawan)
        else:
            return Response({'error': 'Unauthorized role'}, status=403)

        serializer = KehadiranSerializer(presence, many=True)
        return Response(serializer.data)


class KehadiranCreate(APIView):
    def post(self, request):
        auth_header = request.headers.get('Authorization')
        token = None

        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
        else:
            token = request.COOKIES.get('accessToken')

        if not token:
            return Response({"error": "Token tidak ada, tolong masukkan token"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            user_id = decode_access_token(token)
        except exceptions.AuthenticationFailed:
            return Response({"error": "Anda tidak memiliki akses."}, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)
        
        if user.role != 'karyawan':
            return Response({'error': 'Unauthorized role'}, status=403)

        karyawan = Karyawan.objects.filter(user=user).first()
        
        if not karyawan:
            return Response({'error': 'Karyawan data not found for this user'}, status=404)

        keterangan_kehadiran = request.data.get("keterangan_kehadiran")

        if keterangan_kehadiran == Kehadiran.Keterangan.masuk:
            required_fields = ['jam_masuk', 'jam_pulang', 'informasi_kehadiran']
        elif keterangan_kehadiran == Kehadiran.Keterangan.sakit:
            required_fields = ['biaya_pengobatan', 'keterangan_sakit']
        elif keterangan_kehadiran == Kehadiran.Keterangan.izin:
            required_fields = ['keterangan_izin']
        else:
            required_fields = []

        for field in required_fields:
            if not request.data.get(field):
                return Response({f'error': f'{field} is required for {keterangan_kehadiran} status'}, status=400)
        
        total_jam_lembur = request.data.get("total_jam_lembur")
        
        serializer = KehadiranSerializer(data=request.data)
        if serializer.is_valid():
            kehadiran = serializer.save(karyawan=karyawan)
            kehadiran.is_read = False
            kehadiran.save()

            return Response({
                "message": "Berhasil menambah data",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)

        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class KehadiranUpdate(APIView):
    def put(self, request, *args, **kwargs):
        auth_header = request.headers.get('Authorization')
        token = None

        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
        else:
            token = request.COOKIES.get('accessToken')

        if not token:
            return Response({"error": "Token tidak ada, tolong masukkan token"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            user_id = decode_access_token(token)
        except exceptions.AuthenticationFailed:
            return Response({"error": "Anda tidak memiliki akses."}, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)

        if user is None:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        kehadiran_id = kwargs.get('id')
        presence = get_object_or_404(Kehadiran, id=kehadiran_id)

        if user.role in ['admin', 'manager']:
            pass  
        elif user.role == 'karyawan':
            karyawan = Karyawan.objects.filter(user=user).first()
            if presence.karyawan != karyawan:
                return Response({
                    "error": "Anda tidak terdaftar untuk mengupdate data ini"
                }, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({"error": "Invalid user role"}, status=status.HTTP_403_FORBIDDEN)

        serializer = KehadiranSerializer(presence, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Berhasil update data",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

     
class KehadiranDelete(APIView):
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
        except exceptions.AuthenticationFailed as e:
            return Response({
                "error": "Anda tidak memiliki akses."
            }, status=status.HTTP_401_UNAUTHORIZED)

        user = get_object_or_404(User, id=user_id)
    
        if user is None:
            return Response({"error": "User tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

        id = kwargs.get('id')
        attendance = get_object_or_404(Kehadiran, id=id)

        if user.role in ['admin', 'manager']:
            pass
        else:
            return Response({"error": "Invalid user role"}, status=status.HTTP_403_FORBIDDEN)

        attendance.delete()
        return Response({
            "message" : "Success delete data attendance!"
        }, status=status.HTTP_204_NO_CONTENT)
     

class KehadiranApproval(APIView):
    def post(self, request, *args, **kwargs):
        id = kwargs.get('id')
        action = request.data.get('action')  

        kehadiran = get_object_or_404(Kehadiran, id=id)

        if action == 'approve':
            kehadiran.is_approved = True
        elif action == 'reject':
            kehadiran.is_approved = False
        else:
            return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

        kehadiran.is_read = True
        kehadiran.save()

        return Response({
            "message": f"Kehadiran {action}ed successfully",
            "is_approved": kehadiran.is_approved
        }, status=status.HTTP_200_OK)
    

class KehadiranChartView(APIView):
    def get(self, request, year=None):
        if not year:
            today = datetime.today()
            year = today.year

        total_karyawan = Karyawan.objects.count()

        monthly_attendance = []

        for month in range(1, 13):
            kehadiran_masuk = Kehadiran.objects.filter(
                tanggal__year=year,
                tanggal__month=month,
                keterangan_kehadiran=Kehadiran.Keterangan.masuk,  
                is_approved=True
            ).values('karyawan').distinct().count()  

            if total_karyawan > 0:
                persentase_kehadiran = (kehadiran_masuk / total_karyawan) * 100
            else:
                persentase_kehadiran = 0

            monthly_attendance.append({
                "month": month,
                "employees_present": kehadiran_masuk,
                "attendance_percentage": f"{persentase_kehadiran:.2f}%"
            })

        data = {
            "year": year,
            "total_employees": total_karyawan,
            "monthly_attendance": monthly_attendance
        }

        return Response(data, status=status.HTTP_200_OK)