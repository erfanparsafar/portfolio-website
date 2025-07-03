from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import BookSession
from .serializers import BookSessionSerializer

# Create your views here.

class BookSessionViewSet(viewsets.ModelViewSet):
    queryset = BookSession.objects.all()
    serializer_class = BookSessionSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
