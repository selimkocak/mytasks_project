# backend/role/serializers.py
from rest_framework import serializers
from .models import Role
from django.contrib.auth.models import Permission

class RoleSerializer(serializers.ModelSerializer):
    permissions = serializers.SlugRelatedField(
        many=True,
        queryset=Permission.objects.all(),
        slug_field='codename'
     )

    class Meta:
        model = Role
        fields = ['id', 'name', 'permissions']