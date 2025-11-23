from django.db import models

class MaterialAnalysis(models.Model):
    material_name = models.CharField(max_length=100)
    quality_percent = models.FloatField()
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.material_name
