# backend/comment/views.py
from rest_framework import viewsets
from .models import Comment
from .serializers import CommentSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from custom_user.models import CustomUser
from rest_framework_simplejwt.authentication import JWTAuthentication

user = CustomUser

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    authentication_classes = [JWTAuthentication]  # Add authentication classes

    @action(detail=False, methods=['get'])
    def comments_by_task(self, request):
        task_id = request.query_params.get('task_id')
        comments = Comment.objects.filter(task_id=task_id)
        serializer = self.get_serializer(comments, many=True)
        return Response(serializer.data)


    def perform_create(self, serializer):
        user_email = self.request.user
        if isinstance(user_email, str):
            jwt_authentication = JWTAuthentication()
            user_email, _ = jwt_authentication.authenticate(self.request)  # user is the first value returned by authenticate
        user = CustomUser.objects.get(email=user_email)  # find the user with the corresponding email
        serializer.save(user=user)

    def create(self, request, *args, **kwargs):
        try:
            task_id = request.data.get('task')
            request.data['task'] = task_id
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            print('Error creating comment:', e)
            return Response({'error': 'Error creating comment'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
