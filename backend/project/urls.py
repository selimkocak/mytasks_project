# backend/project/urls.py
from django.urls import path
from .views import ProjectListView, ProjectRetrieveUpdateDestroyView, ProjectCreateView

urlpatterns = [
    path('projects/', ProjectListView.as_view(), name='projects_list'),
    path('projects/create/', ProjectCreateView.as_view(), name='projects_create'),
    path('projects/<int:pk>/', ProjectRetrieveUpdateDestroyView.as_view(), name='projects_retrieve_update_destroy'),
]
