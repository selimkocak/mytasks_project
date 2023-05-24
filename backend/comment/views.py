# backend\comment\views.py
from rest_framework import viewsets
from .models import Comment
from .serializers import CommentSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    @action(detail=False, methods=['get'])
    def comments_by_task(self, request):
        task_id = request.query_params.get('task_id')
        comments = Comment.objects.filter(task_id=task_id)
        serializer = self.get_serializer(comments, many=True)
        return Response(serializer.data)
