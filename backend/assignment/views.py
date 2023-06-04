# backend\assignment\views.py
from rest_framework import generics
from .models import TaskAssignment
from .serializers import TaskAssignmentSerializer

class TaskAssignmentListCreateAPIView(generics.ListCreateAPIView):
    queryset = TaskAssignment.objects.all()
    serializer_class = TaskAssignmentSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TaskAssignmentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TaskAssignment.objects.all()
    serializer_class = TaskAssignmentSerializer
