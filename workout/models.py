from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db import models


class WorkoutSession(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE
    )  # Links workout session to a user
    name = models.CharField(
        max_length=100,
        help_text="Enter a session name (e.g., 'Leg Day', 'Mixed', 'Chest Day')",
    )  # Name of workout session
    date = models.DateField(auto_now_add=True)  # Date of workout session
    time = models.TimeField(auto_now_add=True)  # Time of workout session

    def __str__(self):
        return self.name


class Workout(models.Model):
    workout_session = models.ForeignKey(
        WorkoutSession, on_delete=models.CASCADE, related_name="workouts"
    )  # Links workout to a workout session. Each workout is tied to only one session
    weight_carried = models.PositiveIntegerField()  # Weight carried in pounds
    sets = models.PositiveIntegerField(
        validators=[MinValueValidator(1)]
    )  # Number of sets
    reps = models.PositiveIntegerField(
        validators=[MinValueValidator(1)]
    )  # Number of reps
    name = models.CharField(max_length=100)  # Body part worked out

    def __str__(self):
        return f"{self.weight_carried} kgs {self.body_part}"
