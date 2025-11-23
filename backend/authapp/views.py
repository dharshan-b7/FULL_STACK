from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import UserSerializer

@api_view(["POST"])
def register_user(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created"}, status=201)

    return Response(serializer.errors, status=400)


@api_view(["POST"])
def login_user(request):
    email = request.data.get("email")
    password = request.data.get("password")

    user = authenticate(email=email, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"}, status=400)

    return Response({"message": "Login success", "role": user.role}, status=200)
