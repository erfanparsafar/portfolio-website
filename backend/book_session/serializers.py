from rest_framework import serializers
from .models import BookSession

class BookSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookSession
        fields = '__all__' 