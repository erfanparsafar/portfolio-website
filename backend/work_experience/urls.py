from rest_framework import routers
from .views import WorkExperienceViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'work-experience', WorkExperienceViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 