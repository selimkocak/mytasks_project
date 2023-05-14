# backend/company/models.py
from django.db import models
from custom_user.models import CustomUser


class Company(models.Model):
    """
    This model represents a company. A company has a name and a list of members.
    The members are instances of the CustomUser model.
    """
    name = models.CharField(max_length=100)
    members = models.ManyToManyField(CustomUser)

    def __str__(self):
        return self.name