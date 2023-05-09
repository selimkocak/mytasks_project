# backend\company\admin.py
from django.contrib import admin
from .models import Company

class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    filter_horizontal = ('members',)

admin.site.register(Company, CompanyAdmin)
