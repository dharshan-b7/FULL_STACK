from rest_framework import serializers
from .models import ByProduct

class ByProductSerializer(serializers.ModelSerializer):
    managed_by_name = serializers.CharField(
        source='managed_by.full_name', read_only=True)
    
    class Meta:
        model = ByProduct
        fields = ['id', 'name', 'quantity', 'source', 'potential_uses', 
                  'status', 'date', 'managed_by_name']