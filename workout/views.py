from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, permissions, serializers
from .models import WorkoutSession, Workout
from .serializers import WorkoutSessionSerializer, WorkoutSerializer
from rest_framework.generics import RetrieveUpdateDestroyAPIView

class WorkoutSessionViewSet(viewsets.ModelViewSet):
    serializer_class = WorkoutSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WorkoutSession.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class WorkoutViewSet(RetrieveUpdateDestroyAPIView):
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Workout.objects.all()

    def get_queryset(self):
        return Workout.objects.filter(session__user=self.request.user)

    def perform_create(self, serializer):
        session = serializer.validated_data['session']
        if session.user != self.request.user:
            raise serializers.ValidationError("You can only add workouts to your own session.")
        serializer.save()

