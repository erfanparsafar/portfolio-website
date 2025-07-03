from django.db import models

# Create your models here.

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('technical', 'Technical'),
        ('soft', 'Soft'),
    ]
    
    name = models.CharField(max_length=100)
    level = models.IntegerField(default=0, help_text="Percentage (0-100)")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='technical')
    icon = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name
