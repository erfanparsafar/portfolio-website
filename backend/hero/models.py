from django.db import models

class Hero(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300)
    image = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title