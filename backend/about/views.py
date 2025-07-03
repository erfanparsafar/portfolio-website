from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import About
from .serializers import AboutSerializer

# Create your views here.

class AboutViewSet(viewsets.ModelViewSet):
    queryset = About.objects.all()
    serializer_class = AboutSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
