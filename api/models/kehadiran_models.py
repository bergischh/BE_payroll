from django.db import models
from .karyawan_models import Karyawan

class Kehadiran(models.Model):
    class Keterangan(models.TextChoices):
        sakit = 'sakit', 'Sakit'
        izin = 'izin', 'Izin'
        alpha = 'alpha', 'Alpha'
        masuk = 'masuk', 'Masuk'

    id = models.AutoField(primary_key=True)
    tanggal = models.DateField()
    informasi_kehadiran = models.CharField(max_length=100, null=True, blank=True)
    jam_masuk = models.TimeField(null=True, blank=True)
    jam_pulang = models.TimeField(null=True, blank=True)
    total_jam_kerja = models.TimeField(null=True, blank=True)
    keterangan_kehadiran = models.CharField(max_length=50, choices=Keterangan.choices, default=None)
    total_jam_lembur = models.TimeField(null=True, blank=True)
    biaya_pengobatan = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    keterangan_sakit = models.TextField(null=True, blank=True)
    keterangan_izin = models.TextField(null=True, blank=True)
    is_approved = models.BooleanField(default=False)  # True jika disetujui, False jika ditolak
    is_read = models.BooleanField(default=False)      # Menandai apakah notifikasi sudah dibaca

    karyawan = models.ForeignKey(Karyawan, on_delete=models.CASCADE, related_name='kehadirankaryawan', null=True, blank=True)