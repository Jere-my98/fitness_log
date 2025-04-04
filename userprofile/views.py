from rest_framework import generics, permissions
from rest_framework.exceptions import NotFound

from .models import UserProfile
from .serializers import UserProfileSerializer


# Create your views here.
class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    Allows authenticated users to retrieve and update their own UserProfile.
    """

    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """
        Returns the authenticated user's profile.
        """
        try:
            return UserProfile.objects.get(user=self.request.user)

        except UserProfile.DoesNotExist as err:
            raise NotFound(detail="User profile not found.") from err


# class UserProfileTemplateView(LoginRequiredMixin, TemplateView):
#     template_name = 'userprofile/profile.html'

#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['profile'] = get_object_or_404(UserProfile, user=self.request.user)
#         return context

# class UserProfileAvatarView(generics.RetrieveUpdateDestroyAPIView):
#     """
#     Allows authenticated users to upload/update/delete their avatar.
#     """
#     serializer_class = UserProfileSerializer
#     permission_classes = [permissions.IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]  # Support file uploads

#     def get_object(self):
#         try:
#             return UserProfile.objects.get(user=self.request.user)
#         except UserProfile.DoesNotExist:
#             raise NotFound(detail="User profile not found.")
