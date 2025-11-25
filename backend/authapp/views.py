from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import UserSerializer
from .models import User      # <-- FIXED

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

    return Response({
        "message": "Login success",
        "role": user.role,
        "email": user.email,
        "FullName": user.first_name,
    }, status=200)



    from .models import User
from .serializers import UserSerializer

@api_view(["GET"])
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=200)

