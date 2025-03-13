from django.urls import path
from .views import UserProfileAvatarView, UserProfileView

urlpatterns = [
    path('user-profile/', UserProfileView.as_view(), name='user-profile'),
    path('user-profile/avatar/', UserProfileAvatarView.as_view(), name='user-profile-avatar'),
]
