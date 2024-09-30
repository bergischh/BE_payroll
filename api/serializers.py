from rest_framework import serializers
from rest_framework.response import Response

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

class UsersSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = [
            "id",
            "name",
            "role", 
            "email",
            "password",
        ]
        extra_kwargs = {
            'password' : {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
class KaryawanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Karyawan
        fields = '__all__'
        read_only_fields = ['user']  # Jangan izinkan user_id diisi secara manual
    

class DepartementSerializer(serializers.ModelSerializer):
    class Meta : 
        model = Departement
        fields = [
            'id',
            'nama_department',
        ]

    def create(self, validated_data):
        departements = Departement(
            nama_department = validated_data['nama_department'],
        ) 
        departements.save()
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        instance.nama_department = validated_data.get('nama_department', instance.nama_department)
        instance.save()
        return super().update(instance, validated_data)
    
class CalonKaryawanSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalonKaryawan
        fields = '__all__'

class TunjanganSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tunjangan
        fields = '__all__'

class PinjamanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pinjaman
        fields = "__all__"

class KehadiranSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kehadiran
        fields = "__all__"

class LaporanSerializer(serializers.ModelSerializer):
    class Meta:
        model = LaporanGaji
        fields = "__all__"

class PeriodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeriodeGaji
        fields = "__all__"

class SlipGajiSerializer(serializers.ModelSerializer):
    class Meta:
        model = SlipGaji
        fields = "__all__"

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"

