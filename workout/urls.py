from django.urls import path, include
from django.contrib.auth import views as auth_views
from .views import WorkoutSessionList, WorkoutViewSet

urlpatterns = [
    path('workout-sessions/', WorkoutSessionList.as_view(), name='workout-sessions'),
    path('workouts/<int:pk>/', WorkoutViewSet.as_view(), name='workout-detail'),
    path('auth/login/', auth_views.LoginView.as_view(), name='login'),
    path('auth/logout/', auth_views.LogoutView.as_view(), name='logout'),
]
