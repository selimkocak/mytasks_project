# backend/project/urls.py
from django.urls import path
from .views import ProjectListCreateView, ProjectRetrieveUpdateDestroyView

urlpatterns = [
    path('', ProjectListCreateView.as_view(), name='projects_list_create'),
    path('<int:pk>/', ProjectRetrieveUpdateDestroyView.as_view(), name='projects_retrieve_update_destroy'),
]
