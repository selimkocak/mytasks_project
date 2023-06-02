# backend\assignment\serializers.py
from rest_framework import serializers
from .models import TaskAssignment

class TaskAssignmentSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    task = serializers.PrimaryKeyRelatedField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = TaskAssignment
        fields = ('user', 'task', 'created_at')


