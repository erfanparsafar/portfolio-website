from rest_framework import routers
from .views import ContactViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'contact', ContactViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 