from django.urls import path
from .views import RatingViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'ratings', RatingViewSet, basename='rating')
urlpatterns = router.urls
