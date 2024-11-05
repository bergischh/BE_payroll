from django.db import models
from datetime import date

from.pinjaman_models import Pinjaman

class Transaction(models.Model): 
    id = models.AutoField(primary_key=True)
    tanggal_pembayaran = models.DateField(default=date.today)
    jumlah_pembayaran = models.DecimalField(max_digits=12, decimal_places=2)

    # Relasi ke tabel pinjaman karyawan
    pinjaman_karyawan = models.ForeignKey(Pinjaman, on_delete=models.CASCADE, related_name='transaksipembayaran', null=True, blank=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.pinjaman_karyawan:
            self.pinjaman_karyawan.update_status_pembayaran()