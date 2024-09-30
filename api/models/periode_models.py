from django.db import models

class PeriodeGaji(models.Model):
    class Status(models.TextChoices):
        active = 'active', 'Active'
        non_active = 'non_active', 'Non Active'
       

    id = models.AutoField(primary_key=True)
    start_date = models.DateField()
    end_date = models.DateField()
    status_periode = models.CharField(max_length=50, choices=Status.choices, default=None)
    