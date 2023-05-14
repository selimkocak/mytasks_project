# backend\company\views.py
from rest_framework import generics
from .models import Company
from .serializers import CompanySerializer

class CompanyListCreateAPIView(generics.ListCreateAPIView):
    """
    This view provides 'list' and 'create' actions for the Company model.
    """
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class CompanyRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer