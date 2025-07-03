from rest_framework import routers
from .views import HeroViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'hero', HeroViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 