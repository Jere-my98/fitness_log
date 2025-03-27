from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, related_name="userprofile"
    )
    name = models.CharField(max_length=100, blank=True)
    age = models.IntegerField(blank=True, null=True)
    avatar = models.ImageField(
        upload_to="media/avatars", default="media/avatars/default.jpg"
    )
    mantra = models.TextField(default="")

    def __str__(self):
        return self.user.username
