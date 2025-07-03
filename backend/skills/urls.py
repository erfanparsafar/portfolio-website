from rest_framework import routers
from .views import SkillViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'skills', SkillViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 