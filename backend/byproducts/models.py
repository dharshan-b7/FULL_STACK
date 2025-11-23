from django.db import models
from django.conf import settings

class ByProduct(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('recycled', 'Recycled'),
    ]
    
    name = models.CharField(max_length=100)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    source = models.CharField(max_length=255)
    potential_uses = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    date = models.DateField(auto_now_add=True)
    managed_by = models.ForeignKey(settings.AUTH_USER_MODEL, 
                                   on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'byproducts'