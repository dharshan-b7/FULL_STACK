from django.db import models
from django.conf import settings

class Analysis(models.Model):
    material = models.OneToOneField('materials.Material', on_delete=models.CASCADE)
    aluminum_yield = models.DecimalField(max_digits=5, decimal_places=2)
    aluminum_weight = models.DecimalField(max_digits=10, decimal_places=2)
    efficiency_score = models.IntegerField()
    recommendation = models.TextField()
    analyzed_by = models.ForeignKey(settings.AUTH_USER_MODEL, 
                                    on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'analyses'

class ByProductPrediction(models.Model):
    analysis = models.ForeignKey(Analysis, on_delete=models.CASCADE, 
                                related_name='byproducts')
    name = models.CharField(max_length=100)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    percentage = models.DecimalField(max_digits=5, decimal_places=2)
    
    class Meta:
        db_table = 'byproduct_predictions'