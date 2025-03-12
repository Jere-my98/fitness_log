from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets, permissions, serializers
from .models import WorkoutSession, Workout
from .serializers import WorkoutSessionSerializer, WorkoutSerializer
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens.get('access')
            refresh_token = tokens.get('refresh')

            if not access_token and not refresh_token:
                return Response({'success': False, 'error': 'Tokens not generated.'}, status=400)
            
            # res = Response({'success': True})

            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                samesite='None',  # Required for cross-origin cookies
                secure=False,     # Use False for localhost; change to True in production
                path='/',
            )

            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                samesite='None',
                secure=False,     # Use False for localhost; change to True in production
                path='/',
            )

            return response

        except Exception as e:
            return Response({'success': False, 'error': str(e)}, status=500)
class CustomRefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')

            if not refresh_token:
                return Response(
                    {"refreshed": False, "error": "Refresh token is missing."}, 
                    status=400
                )
            # Create mutable data
            data = request.data.copy()
            data['refresh'] = refresh_token

            request._full_data = data

            response = super().post(request, *args, **kwargs)

            access_token = response.data.get('access')
            res = Response({'refreshed': True})
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                samesite='None',
                secure=True,
                path='/',
            )
            return res

        except Exception as e:
            return Response({'refreshed': False, 'error': str(e)})

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            response = Response({"detail": "Logout successful."})
            response.delete_cookie('access_token', path='/',samesite='None')
            response.delete_cookie('refresh_token',path='/',samesite='None')
            return response
    
        except Exception as e:
            return Response({'success': False, 'error': str(e)})

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

