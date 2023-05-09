# backend\rating\models.py
from django.db import models
from custom_user.models import CustomUser
from assignment.models import Task

class Rating(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    stars = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ('user', 'task')