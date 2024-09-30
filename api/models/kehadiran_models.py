from django.db import models
from .karyawan_models import Karyawan

class Kehadiran(models.Model) :
    class Keterangan(models.TextChoices) :
        sakit = 'sakit', 'Sakit'
        izin = 'izin', 'izin'
        alpha = 'alpha', 'Alpha'
        masuk = 'masuk', 'Masuk'

    id = models.AutoField(primary_key=True)
    tanggal = models.DateField()
    informasi_kehadiran = models.CharField(max_length=100)
    jam_masuk = models.TimeField()
    jam_pulang = models.TimeField()
    total_jam_kerja = models.TimeField()
    keterangan_kehadiran = models.CharField(max_length=50, choices=Keterangan.choices, default=None)
    total_jam_lembur = models.TimeField()
    biaya_pengobatan = models.DecimalField(max_digits=12, decimal_places=2)

    # Relasi ke tabel karyawan
    karyawan = models.ForeignKey(Karyawan, on_delete=models.CASCADE, related_name='kehadirankaryawan', null=True, blank=True)