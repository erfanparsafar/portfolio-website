from rest_framework import routers
from .views import WritingViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'writings', WritingViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 