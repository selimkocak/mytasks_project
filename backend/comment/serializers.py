# backend\comment\serializers.py
from rest_framework import serializers
from .models import Comment
from custom_user.models import CustomUser

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Comment
        fields = '__all__'

