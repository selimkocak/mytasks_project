# backend\custom_user\urls.py kodlarım
from django.urls import path, include
from .views import RegisterView, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
   
    path('auth/', include('rest_framework.urls')),
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   
]
