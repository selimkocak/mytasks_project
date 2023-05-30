# backend\assignment\models.py
from django.db import models
from custom_user.models import CustomUser
from api.models import Task

class TaskAssignment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.task.title}"
