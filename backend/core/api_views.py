from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from .models import HelpRequest

@api_view(['POST'])
def register_api(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "User registered successfully"},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response(
            {
                "message": "Login successful",
                "username": user.username
            },
            status=status.HTTP_200_OK
        )
    else:
        return Response(
            {"error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def post_help_api(request):
    data = request.data

    help_obj = HelpRequest.objects.create(
        user=request.user,
        title=data["title"],
        description=data["description"],
        phone=data["phone"],
        latitude=data["latitude"],
        longitude=data["longitude"],
    )

    return Response({"message": "Help posted successfully"})

