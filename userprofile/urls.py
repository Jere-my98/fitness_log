from django.urls import path
from .views import UserProfileViewSet

urlpatterns = [
    path('profile/', UserProfileViewSet.as_view(), name='user-profile'),
]
