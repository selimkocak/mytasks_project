# backend\kanban\admin.py
from django.contrib import admin
from .models import KanbanBoard, KanbanStage

class KanbanStageInline(admin.TabularInline):
    model = KanbanStage
    extra = 0  # Default olarak hiçbir ekstra form görüntülenmeyecek

class KanbanBoardAdmin(admin.ModelAdmin):
    list_display = ('name', 'company')
    search_fields = ('name', 'company__name')
    inlines = [KanbanStageInline]

admin.site.register(KanbanBoard, KanbanBoardAdmin)

class KanbanStageAdmin(admin.ModelAdmin):
    list_display = ('name', 'board', 'order')
    search_fields = ('name', 'board__name')
    list_filter = ('board',)

admin.site.register(KanbanStage, KanbanStageAdmin)
