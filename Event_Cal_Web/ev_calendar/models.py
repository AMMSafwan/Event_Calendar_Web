from django.db import models

# Create your models here.
class Event(models.Model):
    title = models.CharField(max_length=255)
    start = models.DateField()
    end = models.DateField()

    def __str__(self):
        return self.title
