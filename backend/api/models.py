# backend/api/models.py
from django.db import models
from custom_user.models import CustomUser
from notification.models import Notification
from kanban.models import KanbanStage

class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    stage = models.ForeignKey(KanbanStage, on_delete=models.CASCADE, related_name='tasks')
    assignee = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='tasks_assigned')
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='tasks_created')
    create_date = models.DateTimeField(auto_now_add=True)  # new line

    def __str__(self):
        return self.title

from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=Task)
def send_task_created_notification(sender, instance, created, **kwargs):
    if created:
        notification = Notification(
            user=instance.assignee,
            title="New Task Assigned",
            description=f"You have been assigned a new task: {instance.title}",
        )
        notification.save()


