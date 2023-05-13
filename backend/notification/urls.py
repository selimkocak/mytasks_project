# backend\notification\urls.py
from django.urls import path
from notification.views import NotificationListCreateAPIView, NotificationRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('notifications/', NotificationListCreateAPIView.as_view(), name='notifications_list_create'),
    path('notifications/<int:pk>/', NotificationRetrieveUpdateDestroyAPIView.as_view(), name='notifications_retrieve_update_destroy'),
]
