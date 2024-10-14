from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator, RegexValidator
from django.utils import timezone
import os

from .user_models import User
from .departement_models import Departement


def user_directory_path(instance, filename):
    # Menghasilkan nama file baru dengan menambahkan timestamp
    timestamp = timezone.now().strftime('%Y%m%d_%H%M%S')  # Format: YYYYMMDD_HHMMSS
    ext = filename.split('.')[-1]  # Ambil ekstensi file
    new_filename = f"{timestamp}.{ext}"  # Gabungkan nama baru dengan ekstensi
    return os.path.join('foto_karyawan/', new_filename)


class Karyawan(models.Model):  

    class JenisKelamin(models.TextChoices) :
        laki_laki = 'laki_laki', 'Laki Laki'
        perempuan = 'perempuan', 'Perempuan'   

    class Status(models.TextChoices) : 
        kawin = 'kawin', 'Kawin'
        belum_kawin = 'belum_kawin', 'Belum Kawin'

    id = models.AutoField(primary_key=True)
    nik = models.IntegerField()
    nama_karyawan = models.CharField(max_length=100)
    tempat_lahir = models.CharField(max_length=100)
    jenis_kelamin = models.CharField(max_length=10, choices=JenisKelamin.choices, default=None)
    tanggal_lahir = models.DateField()
    agama = models.CharField(max_length=100)
    status = models.CharField(max_length=50, choices=Status.choices, default=None)
    jumlah_anak = models.IntegerField()
    alamat = models.CharField(max_length=100)
    no_telephone = models.CharField(
        max_length=12,
        validators=[
            MinLengthValidator(10),
            MaxLengthValidator(12),
            RegexValidator(
                regex=r'^\d{10,12}$',
                message='Nomor telepon harus terdiri dari 10 hingga 12 angka.',
                code='invalid_number'
            ),
        ],
    ) 
    # email = models.CharField(max_length=100)
    jabatan = models.CharField(max_length=100)
    foto = models.ImageField(upload_to=user_directory_path, null=True, blank=True)
    

    # Relasi ke tabel User
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='karyawan_profiles')

    # Relasi ke tabel Departement
    department = models.ForeignKey(Departement, on_delete=models.CASCADE, related_name='karyawan_profiles')

    def save(self, *args, **kwargs):
        # Hapus file gambar lama jika ada sebelum menyimpan gambar baru
        if self.pk:  # Memeriksa apakah objek sudah ada (update)
            old_instance = Karyawan.objects.get(pk=self.pk)  # Ambil objek lama
            if old_instance.foto and old_instance.foto != self.foto:
                if os.path.isfile(old_instance.foto.path):
                    os.remove(old_instance.foto.path)  # Hapus file lama

        super().save(*args, **kwargs)  # Panggil method save superclass

    def delete(self, *args, **kwargs):
        # Hapus file gambar dari penyimpanan lokal jika ada
        if self.foto:
            if os.path.isfile(self.foto.path):
                os.remove(self.foto.path)
        super().delete(*args, **kwargs)  # Panggil method delete superclass


    def __str__(self):
        return self.nama_karyawan
