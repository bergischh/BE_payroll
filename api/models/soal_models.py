from django.db import models

class Karyawan(models.Model):
    nama = models.CharField(max_length=100)
    posisi = models.CharField(max_length=100)

    def __str__(self):
        return self.nama

class Wawancara(models.Model):
    karyawan = models.ForeignKey(Karyawan, on_delete=models.CASCADE)
    tanggal = models.DateField()
    hasil = models.TextField()

    def __str__(self):
        return f"Wawancara {self.karyawan.nama} pada {self.tanggal}"
    

  
   
