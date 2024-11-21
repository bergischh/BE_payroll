from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'admin', 'Admin'
        MANAGER = 'manager', 'Manager'
        KARYAWAN = 'karyawan', 'Karyawan'
        CALON_KARYAWAN = 'calon_karyawan', 'Calon Karyawan'

    id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=255, unique=True)
    role = models.CharField(max_length=50, choices=Role.choices, default=None)
    password = models.CharField(max_length=255)
    username =  models.CharField(max_length=100, unique=True, null=True)


    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username
