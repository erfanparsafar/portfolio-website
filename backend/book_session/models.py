from django.db import models

class BookSession(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    date = models.DateTimeField()

    def __str__(self):
        return f"{self.name} - {self.date}"