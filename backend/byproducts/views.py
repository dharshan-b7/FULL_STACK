from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import ByProduct
from .serializers import ByProductSerializer

class ByProductListView(generics.ListAPIView):
    queryset = ByProduct.objects.all()
    serializer_class = ByProductSerializer
    permission_classes = [IsAuthenticated]

class ByProductStatusUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pk):
        try:
            byproduct = ByProduct.objects.get(pk=pk)
            byproduct.status = request.data['status']
            byproduct.managed_by = request.user
            byproduct.save()
            return Response(ByProductSerializer(byproduct).data)
        except ByProduct.DoesNotExist:
            return Response({'error': 'Not found'}, 
                          status=status.HTTP_404_NOT_FOUND)