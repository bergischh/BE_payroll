from django.db import models

from .karyawan_models import Karyawan
class Pinjaman(models.Model) :

    id = models.AutoField(primary_key=True)
    jumlah_pinjaman = models.DecimalField(max_digits=12, decimal_places=2)
    tanggal_pinjaman = models.DateField(blank=True, null=True)
    tenggat_pinjaman = models.DateField(blank=True, null=True)
    is_approve = models.BooleanField(default=False)
    status_pembayaran = models.BooleanField(default=False)  # False berarti belum lunas, True berarti sudah lunas

    karyawan = models.ForeignKey(Karyawan, on_delete=models.CASCADE, related_name='pinjamankaryawan', null=True, blank=True)

    def update_status_pembayaran(self):
        total_pembayaran = sum(transaction.jumlah_pembayaran for transaction in self.transaksipembayaran.all())
        if total_pembayaran >= self.jumlah_pinjaman:
            self.status_pembayaran = True
        else:
            self.status_pembayaran = False
        self.save()