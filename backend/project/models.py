# backend/project/models.py
from django.db import models
from custom_user.models import CustomUser

class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField()
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='owned_projects')
    members = models.ManyToManyField(CustomUser, related_name='projects')

    def __str__(self):
        return self.name