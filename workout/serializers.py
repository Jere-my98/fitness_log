from rest_framework import serializers
from .models import WorkoutSession, Workout

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['weight_carried', 'sets', 'reps', 'body_part']
        
class WorkoutSessionSerializer(serializers.ModelSerializer):
    workouts = WorkoutSerializer(many=True)
    time = serializers.TimeField(format="%H:%M", read_only=True)
    
    class Meta:
        model = WorkoutSession
        fields = ['name', 'workouts', 'time']

    def create(self, validated_data):
        workouts_data = validated_data.pop('workouts')
        workout_session = WorkoutSession.objects.create(**validated_data)
        
        for workout_data in workouts_data:
            Workout.objects.create(session=workout_session, **workout_data)
        
        return workout_session
