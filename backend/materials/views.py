from rest_framework import generics, permissions
from .models import Material
from .serializers import MaterialSerializer

class MaterialListView(generics.ListAPIView):
    serializer_class = MaterialSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Material.objects.filter(submitted_by=self.request.user)