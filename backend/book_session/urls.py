from rest_framework import routers
from .views import BookSessionViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'book-session', BookSessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 