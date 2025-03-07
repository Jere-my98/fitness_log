from django.urls import path
from .views import UserProfileViewSet, UserProfileAvatarView

urlpatterns = [
    path('profile/', UserProfileViewSet.as_view(), name='user-profile'),
    path('profile/avatar/', UserProfileAvatarView.as_view(), name='user-profile-avatar'),
]
