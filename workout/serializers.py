from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Tag, Workout, WorkoutSession

# TODO: Create a Github Action Pipeline to run tests and lint your code
# TODO: Check out Ruff and Black for linting and formatting your code
# TODO: Set up PreCommit hooks to lint and format your code automatically
# TODO: Setup your IDE to support linting and formatting your code with the tool of choice for the above
# TODO: Write Docs for your Application (README.md and an OpenAPI spec (Swagger, DRF))
# TODO: Write Tests for your Application.
# TODO: Setup a command to Seed your Database with some data.


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]


class WorkoutSerializer(serializers.ModelSerializer):
    tag = serializers.CharField(
        write_only=True
    )  # Accepts both tag names for new tags and existing tag IDs
    tag_detail = TagSerializer(
        source="tag", read_only=True
    )  # For displaying tag details

    class Meta:
        model = Workout
        fields = ["weight_carried", "sets", "reps", "body_part", "tag", "tag_detail"]

    def create(self, validated_data):
        tag_name = validated_data.pop("tag", None)
        if tag_name:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            validated_data["tag"] = tag
        return super().create(validated_data)

    def update(self, instance, validated_data):
        tag_name = validated_data.pop("tag", None)
        if tag_name:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            validated_data["tag"] = tag
        return super().update(instance, validated_data)


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
