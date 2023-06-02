# backend\api\serializers.py
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    assignee_name = serializers.CharField(source='assignee.full_name', read_only=True)

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ('assignee', 'created_by', 'assignee_name')
