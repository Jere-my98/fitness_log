from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import viewsets, permissions, serializers
from .models import WorkoutSession, Workout
from django.views.generic import TemplateView
from .serializers import WorkoutSessionSerializer, WorkoutSerializer
from rest_framework.generics import RetrieveUpdateDestroyAPIView

class WorkoutSessionViewSet(viewsets.ModelViewSet):
    serializer_class = WorkoutSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WorkoutSession.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class WorkoutSessionTemplateView(LoginRequiredMixin,TemplateView):
    template_name = 'workout/workout_session.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context ['workout_sessions'] = WorkoutSession.objects.filter(user=self.request.user)
        return context
    
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

