from django.db import models

class Karyawan(models.Model):
    nama = models.CharField(max_length=100)
    posisi = models.CharField(max_length=100)

    def __str__(self):
        return self.nama

class Wawancara(models.Model):
    PENILAIAN_CHOICES = [
        ('K', 'Kurang'),
        ('C', 'Cukup'),
        ('B', 'Baik'),
    ]
    
    karyawan = models.ForeignKey(Karyawan, on_delete=models.CASCADE)
    aspek_teknis = models.Char
