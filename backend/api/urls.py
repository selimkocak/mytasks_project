# backend/api/urls.py
from django.urls import path
from .views import TaskListCreateAPIView, TaskRetrieveUpdateDestroyAPIView, CheckLoggedInView

urlpatterns = [
    path('tasks/', TaskListCreateAPIView.as_view(), name='tasks_list_create'),
    path('tasks/<int:pk>/', TaskRetrieveUpdateDestroyAPIView.as_view(), name='tasks_retrieve_update_destroy'),
    path('check_logged_in/', CheckLoggedInView.as_view(), name='check_logged_in'),
]