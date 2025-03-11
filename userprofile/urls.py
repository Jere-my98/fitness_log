from django.urls import path
from .views import UserProfileTemplateView, UserProfileAvatarView

urlpatterns = [
    path('user-profile/', UserProfileTemplateView.as_view(), name='user-profile'),
    path('user-profile/avatar/', UserProfileAvatarView.as_view(), name='user-profile-avatar'),
]
