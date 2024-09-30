from django.db import models

from.pinjaman_models import Pinjaman

class Transaction(models.Model): 
    id = models.AutoField(primary_key=True)
    tanggal_pembayaran = models.DateField()
    jumlah_pembayaran = models.DecimalField(max_digits=12, decimal_places=2)

    # Relasi ke tabel pinjaman karyawan
    pinjaman_karyawan = models.ForeignKey(Pinjaman, on_delete=models.CASCADE, related_name='transaksipembayaran', null=True, blank=True)