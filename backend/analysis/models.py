from django.db import models

class MaterialAnalysis(models.Model):
    material_name = models.CharField(max_length=100)
    quality_percent = models.FloatField()
    weight = models.FloatField(default=0)  # ← missing field (add this)

    created_at = models.DateTimeField(auto_now_add=True)
