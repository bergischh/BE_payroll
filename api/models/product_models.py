from django.db import models
from django.utils import timezone
import os

def product_directory_path(instance, filename):
    timestamp = timezone.now().strftime('%Y%m%d_%H%M%S')  
    ext = filename.split('.')[-1]  
    new_filename = f"{timestamp}.{ext}"  
    return os.path.join('img_product/', new_filename)

class Product(models.Model):
    category_name = models.CharField(max_length=100)
    img_product = models.ImageField(upload_to=product_directory_path, null=True, blank=True)