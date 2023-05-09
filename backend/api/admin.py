# backend\api\admin.py
from django.contrib import admin
from .models import Task

class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'stage', 'assignee', 'created_by')
    list_filter = ('assignee', 'created_by', 'stage')
    search_fields = ('title',)

admin.site.register(Task, TaskAdmin)
