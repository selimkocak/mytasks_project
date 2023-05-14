# backend\notification\views.py
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework import generics

class NotificationListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(user=user)


class NotificationRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer