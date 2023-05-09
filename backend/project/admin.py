# backend\project\admin.py
from django.contrib import admin
from .models import Project

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'start_date', 'end_date', 'owner')
    search_fields = ('name', 'description', 'owner__email')
    list_filter = ('start_date', 'end_date', 'owner')

admin.site.register(Project, ProjectAdmin)
