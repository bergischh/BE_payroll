from django.db import models

from .karyawan_models import Karyawan
from .laporangaji_models import LaporanGaji

class SlipGaji(models.Model):
    id = models.AutoField(primary_key=True)
    terima_dari = models.CharField(max_length=100)
    nominal_gaji = models.DecimalField(max_digits=12, decimal_places=2)
    untuk_pembayaran = models.CharField(max_length=100)

    # relasi ke tabel karyawan
    karyawan = models.ForeignKey(Karyawan, on_delete=models.CASCADE, related_name='slipgaji', null=True, blank=True)

    # relasi ke tabel laporan penggajian
    Laporan_penggajian = models.ForeignKey(LaporanGaji, on_delete=models.CASCADE, related_name='slipgaji', null=True, blank=True)