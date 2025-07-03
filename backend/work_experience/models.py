from django.db import models

# Create your models here.

class WorkExperience(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
    ]
    
    title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField()
    description_en = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='completed')
    period = models.CharField(max_length=50, blank=True, null=True)
    period_en = models.CharField(max_length=50, blank=True, null=True)
    role = models.CharField(max_length=100, blank=True, null=True)
    role_en = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.title} at {self.company}"
