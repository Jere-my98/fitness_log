from django.urls import path, include
from django.contrib.auth import views as auth_views
from rest_framework.routers import DefaultRouter
from .views import WorkoutSessionTemplateView, WorkoutViewSet


urlpatterns = [
    path('workout-session/', WorkoutSessionTemplateView.as_view(), name='workout-session'),
    path('workouts/<int:pk>/', WorkoutViewSet.as_view(), name='workout-detail'),
    path('auth/login/', auth_views.LoginView.as_view(), name='login'),
    path('auth/logout/', auth_views.LogoutView.as_view(), name='logout'),
]
