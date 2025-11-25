from rest_framework import serializers
from .models import MaterialAnalysis

class MaterialAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialAnalysis
        fields = "__all__"
