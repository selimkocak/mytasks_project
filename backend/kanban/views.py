# backend\kanban\views.py
from rest_framework import viewsets
from .models import KanbanBoard, KanbanStage
from .serializers import KanbanBoardSerializer, KanbanStageSerializer

class KanbanBoardViewSet(viewsets.ModelViewSet):
    queryset = KanbanBoard.objects.all()
    serializer_class = KanbanBoardSerializer

class KanbanStageViewSet(viewsets.ModelViewSet):
    queryset = KanbanStage.objects.all()
    serializer_class = KanbanStageSerializer
