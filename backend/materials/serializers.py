from rest_framework import serializers
from .models import Material

class MaterialSerializer(serializers.ModelSerializer):
    submitted_by_name = serializers.CharField(
        source='submitted_by.full_name', read_only=True)
    
    class Meta:
        model = Material
        fields = ['id', 'material_type', 'weight', 'purity', 'source', 
                  'notes', 'status', 'submitted_by_name', 'created_at']