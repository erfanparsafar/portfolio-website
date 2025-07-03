from django.db import models

# Create your models here.

class Project(models.Model):
    STATUS_CHOICES = [
        ('completed', 'Completed'),
        ('in_development', 'In Development'),
        ('planned', 'Planned'),
    ]
    
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='completed')
    tech = models.TextField(blank=True, null=True, help_text="Comma separated tech stack")
    year = models.CharField(max_length=50, blank=True, null=True)
    link = models.URLField(blank=True, null=True)
    image = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title
