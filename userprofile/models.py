from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model): 
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, related_name='userprofile')
    name = models.CharField(max_length=100, null=True)
    age = models.IntegerField(blank=True, null=True)
    avatar = models.ImageField(upload_to='media/avatars', default='media/avatars/default.jpg')
    mantra = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.username
