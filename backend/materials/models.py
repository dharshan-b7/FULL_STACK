from django.db import models
from django.conf import settings

class Material(models.Model):
    MATERIAL_TYPE_CHOICES = [
        ('bauxite', 'Bauxite Ore'),
        ('scrap', 'Aluminum Scrap'),
        ('dross', 'Aluminum Dross'),
        ('recycled', 'Recycled Material'),
    ]
    
    material_type = models.CharField(max_length=20, choices=MATERIAL_TYPE_CHOICES)
    weight = models.DecimalField(max_digits=10, decimal_places=2)
    purity = models.DecimalField(max_digits=5, decimal_places=2)
    source = models.CharField(max_length=255)
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, default='pending')
    submitted_by = models.ForeignKey(settings.AUTH_USER_MODEL, 
                                    on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'materials'
    
    def __str__(self):
        return f"{self.material_type} - {self.weight}kg"