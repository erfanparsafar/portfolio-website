from rest_framework import routers
from .views import AboutViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'about', AboutViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 