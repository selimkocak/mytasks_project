# backend/company/urls.py
from django.urls import path
from .views import CompanyListCreateAPIView, CompanyRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', CompanyListCreateAPIView.as_view(), name='company_list_create'),
    path('<int:pk>/', CompanyRetrieveUpdateDestroyAPIView.as_view(), name='company_retrieve_update_destroy'),
]