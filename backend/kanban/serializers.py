# backend\kanban\serializers.py
from rest_framework import serializers
from .models import KanbanBoard, KanbanStage

class KanbanBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = KanbanBoard
        fields = '__all__'

class KanbanStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = KanbanStage
        fields = '__all__'