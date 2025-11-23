from rest_framework import serializers
from .models import ByProduct

class ByProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ByProduct
        fields = '__all__'
