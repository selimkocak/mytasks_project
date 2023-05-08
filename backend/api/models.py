# backend/api/models.py
from django.db import models
from custom_user.models import CustomUser
from company.models import Company
from notification.models import Notification


class KanbanBoard(models.Model):
    name = models.CharField(max_length=255)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='kanban_boards')

    def __str__(self):
        return self.name


class KanbanStage(models.Model):
    name = models.CharField(max_length=255)
    board = models.ForeignKey(KanbanBoard, on_delete=models.CASCADE, related_name='stages')
    order = models.PositiveIntegerField(default=0)  # Aşamaların sırasını belirlemek için

    class Meta:
        ordering = ['order']  # Aşamaların sırasına göre sıralanması

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name

class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    stage = models.ForeignKey(KanbanStage, on_delete=models.SET_NULL, null=True, related_name='tasks')
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    assignee = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='tasks_assigned')
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='tasks_created')

    def __str__(self):
        return self.title

from django.db.models.signals import post_save
from django.dispatch import receiver
from api.models import Task

@receiver(post_save, sender=Task)
def send_task_created_notification(sender, instance, created, **kwargs):
    if created:
        notification = Notification(
            user=instance.assignee,
            title="New Task Assigned",
            description=f"You have been assigned a new task: {instance.title}",
        )
        notification.save()
