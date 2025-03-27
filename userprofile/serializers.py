from rest_framework import serializers

from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=False)  # Allow optional updates
    mantra = serializers.CharField(required=False)  # Allow optional updates

    class Meta:
        model = UserProfile
        fields = ["name", "age", "avatar", "mantra"]
