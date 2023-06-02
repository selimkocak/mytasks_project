# backend\assignment\models.py
from django.db import models
from custom_user.models import CustomUser
from api.models import Task
from django.db.models.signals import post_save
from django.dispatch import receiver

class TaskAssignment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.task.title}"

@receiver(post_save, sender=TaskAssignment)
def assign_task(sender, instance, created, **kwargs):
    if created:
        task = instance.task
        task.assignee = instance.user
        task.save()
