from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator, RegexValidator
from django.utils import timezone
from .user_models import User
from .departement_models import Departement
import os


def user_directory_path(instance, filename):
    timestamp = timezone.now().strftime('%Y%m%d_%H%M%S')  
    ext = filename.split('.')[-1]  
    new_filename = f"{timestamp}.{ext}"  
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
    jabatan = models.CharField(max_length=100, null=True, blank=True)
    foto = models.ImageField(upload_to=user_directory_path, null=True, blank=True)
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='karyawan_profiles')

    department = models.ForeignKey(Departement, on_delete=models.CASCADE, related_name='karyawan_profiles', null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.pk:  
            old_instance = Karyawan.objects.get(pk=self.pk)  
            if old_instance.foto and old_instance.foto != self.foto:
                if os.path.isfile(old_instance.foto.path):
                    os.remove(old_instance.foto.path)  

        super().save(*args, **kwargs) 

    def delete(self, *args, **kwargs):
        if self.foto:
            if os.path.isfile(self.foto.path):
                os.remove(self.foto.path)
        super().delete(*args, **kwargs)  

    def __str__(self):
        return self.nama_karyawan
