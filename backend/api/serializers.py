# backend\api\serializers.py
from rest_framework import serializers
from .models import Task
from custom_user.models import CustomUser

class TaskSerializer(serializers.ModelSerializer):
    assignee_name = serializers.CharField(source='assignee.full_name', read_only=True)

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ('assignee', 'created_by', 'assignee_name')


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name']