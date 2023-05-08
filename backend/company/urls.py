from django.urls import path
from .views import CompanyListCreateAPIView, CompanyRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('companies/', CompanyListCreateAPIView.as_view(), name='companies_list_create'),
    path('companies/<int:pk>/', CompanyRetrieveUpdateDestroyAPIView.as_view(), name='companies_retrieve_update_destroy'),
]
