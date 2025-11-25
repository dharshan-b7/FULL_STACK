from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ByProduct
from .serializers import ByProductSerializer
from byproduct.models import ByProduct


@api_view(["GET"])
def list_byproducts(request):
    data = ByProduct.objects.all().order_by("-id")
    serializer = ByProductSerializer(data, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def add_byproduct(request):
    serializer = ByProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(["PATCH"])
def update_byproduct_status(request, id):
    try:
        item = ByProduct.objects.get(id=id)
    except ByProduct.DoesNotExist:
        return Response({"error": "Not found"}, status=404)

    item.status = request.data.get("status", item.status)
    item.save()

    serializer = ByProductSerializer(item)
    return Response(serializer.data)
