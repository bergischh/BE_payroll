from django.db import models
from .tunjangan_models import Tunjangan
from .pinjaman_models import Pinjaman
from .periode_models import PeriodeGaji
from .karyawan_models import Karyawan



class LaporanGaji(models.Model) :
    
    id = models.AutoField(primary_key=True)
    tanggal_gaji = models.DateField()
    gaji_mentah = models.DecimalField(max_digits=12, decimal_places=2)
    gaji_total = models.DecimalField(max_digits=12, decimal_places=2)
    jumlah_izin = models.IntegerField()
    jumlah_sakit = models.IntegerField()

    # relsi ke tabel pinjaman
    pinjaman = models.ForeignKey(Pinjaman, on_delete=models.CASCADE, related_name='laporanpenggajian', null=True, blank=True)

    # relasi ke tabel karyawan
    karyawan = models.ForeignKey(Karyawan, on_delete=models.CASCADE, related_name='laporanpenggajian', null=True, blank=True)

    # relasi ke tabel tunjangan
    tunjangan = models.ForeignKey(Tunjangan, on_delete=models.CASCADE, related_name='laporanpenggajian', null=True, blank=True)

    # relasi ke tabel periode penggajian 
    periodegaji = models.ForeignKey(PeriodeGaji, on_delete=models.CASCADE, related_name='laporanpenggajian', null=True, blank=True)


    