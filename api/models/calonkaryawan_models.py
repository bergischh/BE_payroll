from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator, RegexValidator
import os
from django.utils import timezone

def user_directory_path(instance, filename):
    timestamp = timezone.now().strftime('%Y%m%d_%H%M%S') 
    ext = filename.split('.')[-1]  
    new_filename = f"{timestamp}.{ext}"  
    return os.path.join('images_profile/', new_filename)

def ktp_upload_path(instance, filename):
    ext = filename.split('.')[-1]  
    new_filename = f"{instance.nama_karyawan.replace(' ', '_')}_KTP.{ext}" 
    return os.path.join('ktp_files/', new_filename)

def ijazah_upload_path(instance, filename):
    ext = filename.split('.')[-1]  
    new_filename = f"{instance.nama_karyawan.replace(' ', '_')}_IJAZAH.{ext}" 
    return os.path.join('ijazah_files/', new_filename)

class CalonKaryawan(models.Model):
    class JenisKelamin(models.TextChoices):
        laki_laki = 'laki_laki', 'Laki Laki'
        perempuan = 'perempuan', 'Perempuan'
        
    class Status(models.TextChoices): 
        kawin = 'kawin', 'Kawin'
        belum_kawin = 'belum_kawin', 'Belum Kawin'

    class StatusWawancara(models.TextChoices):
        diterima = 'diterima', 'Diterima'
        tidak_diterima = 'tidak_diterima', 'Tidak Diterima'

    id = models.AutoField(primary_key=True)
    nik = models.IntegerField()
    nama_karyawan = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    tempat_lahir = models.CharField(max_length=100)
    tanggal_lahir = models.DateField()
    jenis_kelamin = models.CharField(max_length=10, choices=JenisKelamin.choices, default=None)
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
    photo = models.ImageField(upload_to=user_directory_path, null=True, blank=True)
    ktp = models.FileField(upload_to=ktp_upload_path, null=True, blank=True)
    ijazah = models.FileField(upload_to=ijazah_upload_path, null=True, blank=True)
    status_wawancara = models.CharField(max_length=20, choices=StatusWawancara.choices, default=None)
    upload_at = models.DateTimeField(auto_now_add=True)  

    def save(self, *args, **kwargs):
        if self.pk: 
            old_instance = CalonKaryawan.objects.get(pk=self.pk)
            if old_instance.photo and old_instance.photo != self.photo:
                if os.path.isfile(old_instance.photo.path):
                    os.remove(old_instance.photo.path) 
            if old_instance.ktp and old_instance.ktp != self.ktp:
                if os.path.isfile(old_instance.ktp.path):
                    os.remove(old_instance.ktp.path)  
            if old_instance.ijazah and old_instance.ijazah != self.ijazah:
                if os.path.isfile(old_instance.ijazah.path):
                    os.remove(old_instance.ijazah.path) 

        super().save(*args, **kwargs) 

    def delete(self, *args, **kwargs):
        if self.photo:
            if os.path.isfile(self.photo.path):
                os.remove(self.photo.path)
        if self.ktp:
            if os.path.isfile(self.ktp.path):
                os.remove(self.ktp.path)
        if self.ijazah:
            if os.path.isfile(self.ijazah.path):
                os.remove(self.ijazah.path)
        super().delete(*args, **kwargs)  
    def __str__(self):
        return self.nama_karyawan
