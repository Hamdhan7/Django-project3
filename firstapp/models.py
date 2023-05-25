from django.contrib.auth.models import User
from django.db import models


# Create your models here.

class Product(models.Model):
    product_id = models.AutoField(primary_key=True, unique=True)
    product_name = models.CharField(max_length=255)
    product_description = models.TextField()
    product_image = models.ImageField(upload_to='')
    product_quantity = models.IntegerField()
    product_price = models.DecimalField(max_digits=8, decimal_places=2)


class Order(models.Model):
    order_id = models.AutoField(primary_key=True, unique=True)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity_bought = models.PositiveIntegerField()
    status = models.CharField(max_length=50)


# user models
class Display(models.Model):
    product_id = models.AutoField(primary_key=True, unique=True)
    product_name = models.CharField(max_length=255)
    product_description = models.TextField()
    product_image = models.ImageField(upload_to='')
    product_quantity = models.IntegerField()
    product_price = models.DecimalField(max_digits=8, decimal_places=2)
