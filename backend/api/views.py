# backend\api\views.py
from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from kanban.models import KanbanStage
from custom_user.models import CustomUser
from .serializers import TaskSerializer, CustomUserSerializer
from rest_framework.permissions import IsAuthenticated


class CheckLoggedInView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response({'is_logged_in': True})

class TaskListCreateAPIView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, assignee=self.request.user)

class TaskRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        data['created_by'] = CustomUserSerializer(instance.created_by).data
        return Response(data)


class MoveTaskView(APIView):
    """
    Move a task to a new stage.
    """

    def put(self, request, cardId, format=None):
        new_stage_id = request.data.get('new_stage_id')

        try:
            # Find the task
            task = Task.objects.get(id=cardId)

            # Find the current and new stages
            old_stage = KanbanStage.objects.get(id=task.stage_id)
            new_stage = KanbanStage.objects.get(id=new_stage_id)

            # Remove task id from old stage if it exists
            if cardId in old_stage.taskIds:
                old_stage.taskIds.remove(cardId)
                old_stage.save()

            # Add task id to new stage if not already present
            if cardId not in new_stage.taskIds:
                new_stage.taskIds.append(cardId)
                new_stage.save()

            # Update the task's stage
            task.stage = new_stage
            task.save()
            
            return Response({"message": "Task moved successfully"})
            
        except Task.DoesNotExist:
            return Response({"error": "Task not found"}, status=404)
        except KanbanStage.DoesNotExist:
            return Response({"error": "Stage not found"}, status=404)

class TaskCreatorRetrieveAPIView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    lookup_field = 'tasks_created__id'
    lookup_url_kwarg = 'taskId'
    permission_classes = [IsAuthenticated]