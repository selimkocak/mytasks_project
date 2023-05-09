from django.db import models
from company.models import Company

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
