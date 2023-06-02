# backend/assignment/urls.py
from django.urls import path
from .views import TaskAssignmentListCreateAPIView, TaskAssignmentRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', TaskAssignmentListCreateAPIView.as_view(), name='task-assignment-list-create'),
    path('<int:pk>/', TaskAssignmentRetrieveUpdateDestroyAPIView.as_view(), name='task-assignment-detail'),
]

