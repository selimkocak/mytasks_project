# backend\kanban\views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import KanbanBoard, KanbanStage
from .serializers import KanbanBoardSerializer, KanbanStageSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

class KanbanBoardViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]  # Require authentication for kanban board endpoints
    queryset = KanbanBoard.objects.all()
    serializer_class = KanbanBoardSerializer

class KanbanStageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]  # Require authentication for kanban stage endpoints
    queryset = KanbanStage.objects.all()
    serializer_class = KanbanStageSerializer

@api_view(['POST'])
def update_task_ids(request):
    stage_id = request.data.get('stage_id')
    task_ids = request.data.get('task_ids')

    stage = KanbanStage.objects.get(id=stage_id)
    stage.taskIds = task_ids
    stage.save()

    return Response({"message": "Task IDs updated successfully"})
