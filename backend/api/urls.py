# backend/api/urls.py
from django.urls import path
from .views import TaskListCreateAPIView, TaskRetrieveUpdateDestroyAPIView, CheckLoggedInView, MoveTaskView,TaskCreatorRetrieveAPIView

urlpatterns = [
    path('tasks/<int:cardId>/move', MoveTaskView.as_view(), name='move-task'),  # this line is changed
    path('tasks/', TaskListCreateAPIView.as_view(), name='tasks_list_create'),
    path('tasks/<int:pk>/', TaskRetrieveUpdateDestroyAPIView.as_view(), name='tasks_retrieve_update_destroy'),
    path('tasks/<int:taskId>/creator', TaskCreatorRetrieveAPIView.as_view(), name='task_creator_retrieve'),
    path('check_logged_in/', CheckLoggedInView.as_view(), name='check_logged_in'),
]

