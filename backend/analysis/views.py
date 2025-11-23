from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from materials.models import Material
from .models import Analysis, ByProductPrediction
import random

class MaterialAnalysisView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        data = request.data
        
        material = Material.objects.create(
            material_type=data['materialType'],
            weight=data['weight'],
            purity=data['purity'],
            source=data['source'],
            notes=data.get('notes', ''),
            submitted_by=request.user,
            status='analyzing'
        )
        
        # Predict yield
        base_yields = {'bauxite': 50, 'scrap': 85, 'dross': 60, 'recycled': 75}
        base = base_yields.get(data['materialType'], 60)
        aluminum_yield = round(base * (float(data['purity']) / 100) * random.uniform(0.9, 1.1), 2)
        aluminum_weight = float(data['weight']) * (aluminum_yield / 100)
        efficiency_score = min(int((aluminum_yield / float(data['purity'])) * 100), 100)
        
        # Create analysis
        analysis = Analysis.objects.create(
            material=material,
            aluminum_yield=aluminum_yield,
            aluminum_weight=aluminum_weight,
            efficiency_score=efficiency_score,
            recommendation="Process with standard Bayer method",
            analyzed_by=request.user
        )
        
        # Create by-products
        remaining = float(data['weight']) - aluminum_weight
        byproducts = [
            {'name': 'Red Mud', 'quantity': round(remaining * 0.7, 2), 
             'percentage': round((remaining * 0.7 / float(data['weight'])) * 100, 2)},
            {'name': 'Iron Oxide', 'quantity': round(remaining * 0.3, 2), 
             'percentage': round((remaining * 0.3 / float(data['weight'])) * 100, 2)}
        ]
        
        for bp in byproducts:
            ByProductPrediction.objects.create(analysis=analysis, **bp)
        
        material.status = 'completed'
        material.save()
        
        return Response({
            'prediction': {
                'aluminumYield': float(aluminum_yield),
                'aluminumWeight': float(aluminum_weight),
                'efficiencyScore': efficiency_score,
                'recommendation': analysis.recommendation,
                'byProducts': byproducts
            }
        })

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        return Response({
            'stats': {
                'totalProcessed': Material.objects.filter(submitted_by=user).count(),
                'aluminumYield': 75.5,
                'byproductsManaged': 15,
                'pendingAnalysis': Material.objects.filter(
                    submitted_by=user, status='pending').count()
            },
            'recentActivities': []
        })