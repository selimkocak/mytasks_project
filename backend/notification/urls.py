from django.urls import path, include
from notification.views import NotificationListCreateAPIView, NotificationRetrieveUpdateDestroyAPIView

urlpatterns = [
    # Diğer url'ler
    path('notifications/', NotificationListCreateAPIView.as_view(), name='notifications_list_create'),
    path('notifications/<int:pk>/', NotificationRetrieveUpdateDestroyAPIView.as_view(), name='notifications_retrieve_update_destroy'),
]
