from rest_framework import serializers
from .models import Analysis, ByProductPrediction

class ByProductPredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ByProductPrediction
        fields = ['name', 'quantity', 'percentage']

class AnalysisSerializer(serializers.ModelSerializer):
    byproducts = ByProductPredictionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Analysis
        fields = ['id', 'aluminum_yield', 'aluminum_weight', 
                  'efficiency_score', 'recommendation', 'byproducts', 'created_at']