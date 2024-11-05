from django.db import models

from .karyawan_models import Karyawan

class Tunjangan(models.Model):
    id = models.AutoField(primary_key=True)
    tunjangan_makan = models.DecimalField(max_digits=12, decimal_places=2)
    tunjangan_kesehatan = models.DecimalField(max_digits=12, decimal_places=2)
    tunjangan_jabatan = models.DecimalField(max_digits=12, decimal_places=2)
    THR = models.DecimalField(max_digits=12, decimal_places=2)
    bonus = models.DecimalField(max_digits=12, decimal_places=2)

    karyawan = models.ForeignKey(Karyawan, on_delete=models.CASCADE, related_name='tunjangankaryawan', null=True, blank=True)