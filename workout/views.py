from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets, permissions, serializers
from .models import WorkoutSession, Workout
from .serializers import WorkoutSessionSerializer, WorkoutSerializer, UserRegistrationSerializer
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

class UserRegistrationView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        try:
            serializer = UserRegistrationSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'success': True, 'message': 'User created successfully.'})
            return Response({'success': False, 'errors': serializer.errors}, status=400)
        except Exception as e:
            return Response({'success': False, 'error': str(e)}, status=500)
        
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
        """
        List all workout sessions for the authenticated user.
        If `pk` is in the request, filter by that specific session.
        """
        queryset = WorkoutSession.objects.filter(user=self.request.user)
        session_id = self.kwargs.get('pk')
        if session_id:
            queryset = queryset.filter(id=session_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class WorkoutViewSet(viewsets.ModelViewSet):
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Filter workouts by:
        1. Authenticated user's workout sessions.
        2. Specific workout session ID.
        3. Specific workout ID.
        """
        queryset = Workout.objects.filter(workout_session__user=self.request.user)

        # Filter by workout session ID if provided
        session_id = self.kwargs.get('session_id')
        if session_id:
            queryset = queryset.filter(workout_session_id=session_id)

        # Filter by workout ID if provided
        workout_id = self.kwargs.get('pk')
        if workout_id:
            queryset = queryset.filter(id=workout_id)

        return queryset

    def perform_create(self, serializer):
        session = serializer.validated_data['session']
        if session.user != self.request.user:
            raise serializers.ValidationError("You can only add workouts to your own session.")
        serializer.save()
