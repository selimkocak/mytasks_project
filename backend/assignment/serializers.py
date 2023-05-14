# backend\assignment\serializers.py
from rest_framework import serializers
from .models import TaskAssignment

class TaskAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskAssignment
        fields = ('id', 'user', 'task', 'created_at')