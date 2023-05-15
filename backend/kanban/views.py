# backend\kanban\views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import KanbanBoard, KanbanStage
from .serializers import KanbanBoardSerializer, KanbanStageSerializer

class KanbanBoardViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]  # Require authentication for kanban board endpoints
    queryset = KanbanBoard.objects.all()
    serializer_class = KanbanBoardSerializer

class KanbanStageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]  # Require authentication for kanban stage endpoints
    queryset = KanbanStage.objects.all()
    serializer_class = KanbanStageSerializer
