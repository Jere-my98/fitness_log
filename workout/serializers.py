from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Workout, WorkoutSession

# TODO: Create a Github Action Pipeline to run tests and lint your code
# TODO: Check out Ruff and Black for linting and formatting your code
# TODO: Set up PreCommit hooks to lint and format your code automatically
# TODO: Setup your IDE to support linting and formatting your code with the tool of choice for the above
# TODO: Write Docs for your Application (README.md and an OpenAPI spec (Swagger, DRF))
# TODO: Write Tests for your Application.
# TODO: Setup a command to Seed your Database with some data.
# TODO: No merging with main without passing all checks
# TODO: Read about Git stash
# TODO: No pushing directly to main


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ["id", "weight_carried", "sets", "reps", "name"]


class WorkoutSessionSerializer(serializers.ModelSerializer):
    workouts = WorkoutSerializer(many=True)
    date = serializers.DateField(format="%Y-%m-%d", read_only=True)
    time = serializers.TimeField(format="%H:%M", read_only=True)

    class Meta:
        model = WorkoutSession
        fields = ["id", "name", "workouts", "time", "date"]

    def create(self, validated_data):
        workouts_data = validated_data.pop("workouts")
        workout_session = WorkoutSession.objects.create(**validated_data)

        for workout_data in workouts_data:
            Workout.objects.create(session=workout_session, **workout_data)

        return workout_session


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User(username=validated_data["username"], email=validated_data["email"])
        user.set_password(validated_data["password"])
        user.save()
        return user
