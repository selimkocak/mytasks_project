# backend/mytasks/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # 'api' uygulamasının URL'lerini ekleyin
    path('auth/', include('custom_user.urls')),  # 'custom_user' uygulamasının URL'lerini ekleyin
    path('api/company/', include('company.urls')),  # 'company' uygulamasının URL'lerini ekleyin

]

