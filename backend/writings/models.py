from django.db import models

# Create your models here.

class Writing(models.Model):
    title = models.CharField(max_length=200)
    title_fa = models.CharField(max_length=200, blank=True, null=True)
    content = models.TextField()
    content_fa = models.TextField(blank=True, null=True)
    summary = models.TextField(blank=True, null=True)
    summary_fa = models.TextField(blank=True, null=True)
    date = models.DateField()
    link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title
