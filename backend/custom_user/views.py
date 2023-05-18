# backend\custom_user\views.py
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomUserSerializer, CustomTokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .models import CustomUser
from .serializers import CustomUserSerializer


class LoggedInUserEmailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        email = user.email
        return Response({"email": email})

class RegisterView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.COOKIES.get("refresh_token")
            if refresh_token is not None:
                token = RefreshToken(refresh_token)
                token.blacklist()
                response = Response()
                response.delete_cookie("refresh_token")
                return response
            else:
                return Response({"detail": "No refresh token found"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get(self, request, *args, **kwargs):
        email = request.user.email
        if email:
            return Response({'email': email})
        else:
            return Response({'detail': 'No email found'}, status=status.HTTP_400_BAD_REQUEST)