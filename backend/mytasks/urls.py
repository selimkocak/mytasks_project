# backend/mytasks/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  
    path('api/auth/', include('custom_user.urls')), 
    path('api/company/', include('company.urls')),  
    path('api/notification/', include('notification.urls')),  
    path('api/assignment/', include('assignment.urls')),  
    path('api/rating/', include('rating.urls')),  
    path('api/comment/', include('comment.urls')),  
    path('api/project/', include('project.urls')),  
    path('api/kanban/', include('kanban.urls')),  # 'kanban' uygulamasının URL'lerini ekleyin
]