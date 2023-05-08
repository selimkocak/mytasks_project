# backend/mytasks/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # 'api' uygulamasının URL'lerini ekleyin
    path('api/auth/', include('custom_user.urls')),  # 'custom_user' uygulamasının URL'lerini api/auth/ altında ekleyin
    path('api/company/', include('company.urls')),  # 'company' uygulamasının URL'lerini ekleyin
    path('api/notification/', include('notification.urls')),  # 'notification' uygulamasının URL'lerini ekleyin
    path('api/assignment/', include('assignment.urls')),  # 'assignment' uygulamasının URL'lerini ekleyin
    path('api/rating/', include('rating.urls')),  # 'rating' uygulamasının URL'lerini ekleyin
    path('api/comment/', include('comment.urls')),  # 'comment' uygulamasının URL'lerini ekleyin
    path('api/project/', include('project.urls')),  # 'project' uygulamasının URL'lerini ekleyin

]

