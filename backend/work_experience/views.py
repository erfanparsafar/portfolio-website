from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import WorkExperience
from .serializers import WorkExperienceSerializer

# Create your views here.

class WorkExperienceViewSet(viewsets.ModelViewSet):
    queryset = WorkExperience.objects.all()
    serializer_class = WorkExperienceSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
