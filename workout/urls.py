from django.urls import path, include
from django.contrib.auth import views as auth_views
from rest_framework.routers import DefaultRouter
from .views import WorkoutSessionViewSet, WorkoutViewSet

router = DefaultRouter()
router.register(r'workout-sessions', WorkoutSessionViewSet, basename='workout-session')


urlpatterns = [
    path('', include(router.urls)),
    path('workouts/<int:pk>/', WorkoutViewSet.as_view(), name='workout-detail'),
    path('auth/login/', auth_views.LoginView.as_view(), name='login'),
    path('auth/logout/', auth_views.LogoutView.as_view(), name='logout'),
]
