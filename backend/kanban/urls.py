# backend/kanban/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'boards', views.KanbanBoardViewSet)
router.register(r'stages', views.KanbanStageViewSet)

urlpatterns = [
    path('', include(router.urls)),
    
]

