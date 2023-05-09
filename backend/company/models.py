# backend/company/models.py
from django.db import models
from custom_user.models import CustomUser


class Company(models.Model):
    name = models.CharField(max_length=100)
    members = models.ManyToManyField(CustomUser)

    def __str__(self):
        return self.name