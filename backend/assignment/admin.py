# backend\assignment\admin.py
from django.contrib import admin
from .models import TaskAssignment

class TaskAssignmentAdmin(admin.ModelAdmin):
    list_display = ('id','user_id','task_id','user','task', 'created_at')
    list_filter = ('user', 'task')
    search_fields = ('user__username', 'task__title')

admin.site.register(TaskAssignment, TaskAssignmentAdmin)