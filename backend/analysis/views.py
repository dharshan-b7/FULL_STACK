from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import MaterialAnalysis
from .serializers import MaterialAnalysisSerializer



@api_view(["GET"])
def list_materials(request):
    items = MaterialAnalysis.objects.all().order_by('-id')
    serializer = MaterialAnalysisSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def analyze_material(request):
    data = request.data

    try:
        weight = float(data.get("weight", 0))
        purity = float(data.get("purity", 0))
    except:
        return Response({"error": "Invalid input"}, status=status.HTTP_400_BAD_REQUEST)

    aluminum_yield = max(0, min(purity, 100))
    aluminum_weight = round(weight * aluminum_yield / 100, 2)

    by_products = [
        {"name": "Red Mud", "quantity": round(weight * 0.10, 2)},
        {"name": "Silica Residue", "quantity": round(weight * 0.05, 2)},
    ]

    MaterialAnalysis.objects.create(
        material_name=data.get("materialType", "Unknown"),
        quality_percent=purity,
        weight=weight
    )

    return Response({
        "aluminumYield": aluminum_yield,
        "aluminumWeight": aluminum_weight,
        "byProducts": by_products,
        "recommendation": "Use rotary kiln for better efficiency"
    })
