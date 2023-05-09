# backend\notification\admin.py
from django.contrib import admin
from .models import Notification

class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'created_at', 'read')
    search_fields = ('user__email', 'title', 'description')
    list_filter = ('read', 'created_at')

admin.site.register(Notification, NotificationAdmin)