# backend/role/admin.py
from django.contrib import admin
from .models import Role

class RoleAdmin(admin.ModelAdmin):
    list_display = ['name']  # Listelenen alanlar
    search_fields = ['name']  # Arama kutusunda hangi alanlar üzerinde arama yapılabileceği
    filter_horizontal = ('permissions',)  # Çoktan çok ilişkili alanlar için yatay filtre

admin.site.register(Role, RoleAdmin)
