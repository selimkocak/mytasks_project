from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer
from django.http import JsonResponse
from django.views import View

class CheckLoggedInView(View):
    def get(self, request, *args, **kwargs):
        return JsonResponse({
            'is_logged_in': request.user.is_authenticated
        }, status=200)


class TaskListCreateAPIView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

