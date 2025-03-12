from django.urls import path
# from django.contrib.auth import views as auth_views
from .views import WorkoutSessionViewSet, WorkoutViewSet, CustomTokenObtainPairView, CustomRefreshTokenView, LogoutView


urlpatterns = [
    # login and logout urls
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('api/token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),

    # workout sessions urls
    path('workout-sessions/', WorkoutSessionViewSet.as_view({'get': 'list'}), name='workout-session-list'),
    path('workout-sessions/<int:pk>/', WorkoutSessionViewSet.as_view({'get': 'retrieve'}), name='workout-session-detail'),

    # workouts urls
    path('workout-sessions/<int:session_id>/workouts/', WorkoutViewSet.as_view({'get': 'list', 'post': 'create'}), name='workout-list'),
    path('workout-sessions/<int:session_id>/workouts/<int:pk>/', WorkoutViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}),name='workout-detail'),

    # path('auth/login/', auth_views.LoginView.as_view(), name='login'),
    # path('auth/logout/', auth_views.LogoutView.as_view(), name='logout'),
]
