# backend\assignment\views.py
from rest_framework import generics
from .models import TaskAssignment
from .serializers import TaskAssignmentSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from custom_user.serializers import CustomUserSerializer
from django.shortcuts import get_object_or_404

class TaskAssignmentListCreateAPIView(generics.ListCreateAPIView):
    queryset = TaskAssignment.objects.all()
    serializer_class = TaskAssignmentSerializer

class TaskAssignmentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TaskAssignment.objects.all()
    serializer_class = TaskAssignmentSerializer

class GetAssigneeOfTaskView(APIView):

    def get(self, request, task_id, format=None):
        task = get_object_or_404(TaskAssignment, id=task_id)
        serializer = CustomUserSerializer(task.assignee)
        return Response(serializer.data, status=status.HTTP_200_OK)
