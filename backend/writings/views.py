from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Writing
from .serializers import WritingSerializer

# Create your views here.

class WritingViewSet(viewsets.ModelViewSet):
    queryset = Writing.objects.all()
    serializer_class = WritingSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
