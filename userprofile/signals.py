import logging

from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import UserProfile

logger = logging.getLogger(__name__)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        try:
            logger.info(f"Creating UserProfile for user: {instance.username}")
            UserProfile.objects.create(user=instance, name=instance.username)
        except Exception as e:
            logger.error(
                f"Error creating UserProfile for user {instance.username}: {e}"
            )


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, "userprofile"):
        try:
            logger.info(f"Saving UserProfile for user: {instance.username}")
            instance.userprofile.save()
        except Exception as e:
            logger.error(f"Error saving UserProfile for user {instance.username}: {e}")
