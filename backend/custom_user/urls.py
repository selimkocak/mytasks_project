# backend/custom_user/urls.py
from django.urls import path, include
from .views import RegisterView, CustomTokenObtainPairView, LogoutView, UserListView, LoggedInUserEmailView, ResetPasswordView,UserProfileView, UpdateUserProfileView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('users/', UserListView.as_view(), name='user_list'),
    path('user/email/', LoggedInUserEmailView.as_view(), name='logged_in_user_email'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset_password'),
    path('user-profile/<int:pk>/', UserProfileView.as_view(), name='user_profile'),
    path('user-profile/', UserProfileView.as_view(), name='user_profile'),
    path('update-user-profile/', UpdateUserProfileView.as_view(), name='update_user_profile'),
]