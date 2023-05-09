# backend\rating\admin.py
from django.contrib import admin
from .models import Rating

class RatingAdmin(admin.ModelAdmin):
    list_display = ('user', 'task', 'stars')
    search_fields = ('user__email', 'task__title')
    list_filter = ('stars',)

admin.site.register(Rating, RatingAdmin)
