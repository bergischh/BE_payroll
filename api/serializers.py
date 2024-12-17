from rest_framework import serializers
from .models.user_models import User
from .models.karyawan_models import Karyawan
from .models.departement_models import Departement
from .models.calonkaryawan_models import CalonKaryawan
from .models.tunjangan_models import Tunjangan
from .models.pinjaman_models import Pinjaman
from .models.kehadiran_models import Kehadiran
from .models.laporangaji_models import LaporanGaji 
from .models.periode_models import PeriodeGaji
from .models.slipgaji_models import SlipGaji
from .models.transaksi_models import Transaction
from .models.product_models import Product
from .models.company_models import Company

class UsersSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ["id", "username", "role", "email", "password"]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = self.Meta.model(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

class KaryawanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Karyawan
        fields = '__all__'
        # read_only_fields = ['user']  # Jangan izinkan user_id diisi secara manual

class DepartementSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Departement
        fields = ['id', 'nama_department']

class CalonKaryawanSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalonKaryawan
        fields = '__all__'

class TunjanganSerializer(serializers.ModelSerializer):
    karyawan_nama = serializers.CharField(source='karyawan.nama_karyawan', default='')
    karyawan_jabatan = serializers.CharField(source='karyawan.jabatan', default='')
    class Meta:
        model = Tunjangan
        fields = ['id', 'tunjangan_makan', 'tunjangan_kesehatan', 'tunjangan_jabatan', 'THR', 'bonus', 'karyawan_nama', 'karyawan_jabatan']

class PinjamanSerializer(serializers.ModelSerializer):
    karyawan_nik = serializers.CharField(source='karyawan.nik', default='')
    karyawan_nama = serializers.CharField(source='karyawan.nama_karyawan', default='')
    class Meta:
        model = Pinjaman
        fields = ['id', 'jumlah_pinjaman', 'tanggal_pinjaman', 'tenggat_pinjaman', 'status_pembayaran', 'karyawan_nik', 'karyawan_nama', 'is_approve']

class KehadiranSerializer(serializers.ModelSerializer):
    karyawan = serializers.SerializerMethodField()

    class Meta:
        model = Kehadiran
        fields = '__all__'
    
    def get_karyawan(self, instance):
        if instance.karyawan:
            return {
                'id': instance.karyawan.id,
                'nik': instance.karyawan.nik,
                'nama_karyawan': instance.karyawan.nama_karyawan,
                'jabatan': instance.karyawan.jabatan,
            }
        return None

class LaporanSerializer(serializers.ModelSerializer):
    # karyawan = serializers.SerializerMethodField()
    karyawan = serializers.PrimaryKeyRelatedField(queryset=Karyawan.objects.all())
    pinjaman = serializers.PrimaryKeyRelatedField(queryset=Pinjaman.objects.all(), required=False, allow_null=True)
    tunjangan = serializers.PrimaryKeyRelatedField(queryset=Tunjangan.objects.all(), required=False, allow_null=True)
    periodegaji = serializers.PrimaryKeyRelatedField(queryset=PeriodeGaji.objects.all(), required=False, allow_null=True)
    
    class Meta:
        model = LaporanGaji
        fields = '__all__'
        read_only_fields = ['karyawan']

    # def get_karyawan(self, instance):
    #     if instance.karyawan:
    #         return {
    #             'id': instance.karyawan.id,
    #             'nik': instance.karyawan.nik,
    #             'nama_karyawan': instance.karyawan.nama_karyawan,
    #             'jabatan': instance.karyawan.jabatan,
    #         }
    #     return None
    

class PeriodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeriodeGaji
        fields = '__all__'

class SlipGajiSerializer(serializers.ModelSerializer):
    class Meta:
        model = SlipGaji
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'
