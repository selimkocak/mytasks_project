# backend/kanban/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import KanbanBoardViewSet, KanbanStageViewSet

router = DefaultRouter()
router.register(r'boards', KanbanBoardViewSet)
router.register(r'stages', KanbanStageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
