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
from .serializers import CustomUserSerializer, ResetPasswordSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from django.template.loader import render_to_string
from rest_framework.views import APIView
from .serializers import ResetPasswordSerializer
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

User = get_user_model()

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
        




class ResetPasswordView(APIView):
    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        user = get_object_or_404(User, email=email)
        user_id = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        reset_link = render_to_string(
            'email/reset_password.html',
            {
                'user_id': user_id,
                'token': token,
            }
        )
        send_mail(
            'Password Reset',
            '',
            'noreply@example.com',
            [email],
            html_message=reset_link
        )

        return Response(status=status.HTTP_200_OK)




        

