# backend/assignment/urls.py
from django.urls import path
from .views import TaskAssignmentListCreateAPIView, TaskAssignmentRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('task_assignments/', TaskAssignmentListCreateAPIView.as_view(), name='task_assignments_list_create'),
    path('task_assignments/<int:pk>/', TaskAssignmentRetrieveUpdateDestroyAPIView.as_view(), name='task_assignments_retrieve_update_destroy'),
]