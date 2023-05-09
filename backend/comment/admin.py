from django.contrib import admin

# Register your models here.
# backend\comment\admin.py
from django.contrib import admin
from .models import Comment

class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'task', 'content', 'created_at')
    list_filter = ('user', 'task', 'created_at')
    search_fields = ('user__username', 'task__title', 'content')

admin.site.register(Comment, CommentAdmin)