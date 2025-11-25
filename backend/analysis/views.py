from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import MaterialAnalysis
from .serializers import MaterialAnalysisSerializer
from byproduct.models import ByProduct   # <-- ADD THIS


@api_view(['POST'])
def analyze_material(request):
    data = request.data

    try:
        weight = float(data.get("weight", 0))
        purity = float(data.get("purity", 0))
    except:
        return Response({"error": "Invalid input"}, status=status.HTTP_400_BAD_REQUEST)

    # --- CALCULATIONS ---
    aluminum_yield = max(0, min(purity, 100))
    aluminum_weight = round(weight * aluminum_yield / 100, 2)

    red_mud_qty = round(weight * 0.10, 2)
    silica_qty = round(weight * 0.05, 2)

    by_products = [
        {"name": "Red Mud", "quantity": red_mud_qty},
        {"name": "Silica Residue", "quantity": silica_qty},
    ]

    # --- SAVE MATERIAL ANALYSIS ---
    MaterialAnalysis.objects.create(
        material_name=data.get("materialType", "Unknown"),
        quality_percent=purity,
        weight=weight
    )

    # --- SAVE BYPRODUCTS INTO TABLE ---
    for bp in by_products:
        ByProduct.objects.create(
            name=bp["name"],
            quantity=bp["quantity"],
            status="pending",
            source=data.get("materialType", "Unknown"),
            potential_uses=""
        )

    return Response({
    "aluminumYield": aluminum_yield,
    "aluminumWeight": aluminum_weight,
    "material_name": data.get("materialType"),
    "created_at": timezone.now(),
    "byProducts": by_products,
    "recommendation": "Use rotary kiln for better efficiency"
})

@api_view(["GET"])
def list_materials(request):
    items = MaterialAnalysis.objects.all().order_by("-id")
    serializer = MaterialAnalysisSerializer(items, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def report_summary(request):
    materials = MaterialAnalysis.objects.all()
    byproducts = ByProduct.objects.all()

    return Response({
        "total_materials": materials.count(),
        "total_byproducts": byproducts.count(),
        "latest_materials": list(materials.values().order_by("-id")[:5]),
        "latest_byproducts": list(byproducts.values().order_by("-id")[:5]),
    })

