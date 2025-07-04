from django.db import models

# Create your models here.

class About(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title
