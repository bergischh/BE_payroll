from django.db import models
from django.utils import timezone
import os

def openrec_directory_path(instance, filename):
    timestamp = timezone.now().strftime('%Y%m%d_%H%M%S')  
    ext = filename.split('.')[-1]  
    new_filename = f"{timestamp}.{ext}"  
    return os.path.join('img_openrec/', new_filename)

class Company(models.Model): 
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    name_company = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    desc_emply = models.CharField(max_length=255)
    image = models.ImageField(upload_to=openrec_directory_path, null=True, blank=True)
    is_active = models.BooleanField(default=True)  # New field to control display status