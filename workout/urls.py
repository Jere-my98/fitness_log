from django.urls import path, include
from django.contrib.auth import views as auth_views
from .views import WorkoutSessionViewSet, WorkoutViewSet

urlpatterns = [
    path('workout-sessions/<int:pk>/', WorkoutSessionViewSet.as_view({'get': 'list'}), name='workout-sessions'),
    path('workouts/<int:pk>/', WorkoutViewSet.as_view(), name='workout-detail'),
    path('auth/login/', auth_views.LoginView.as_view(), name='login'),
    path('auth/logout/', auth_views.LogoutView.as_view(), name='logout'),
]
