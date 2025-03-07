from rest_framework import permissions, generics
from .models import UserProfile
from rest_framework.exceptions import NotFound
from .serializers import UserProfileSerializer

# Create your views here.
class UserProfileViewSet(generics.RetrieveUpdateAPIView):
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
        
        except UserProfile.DoesNotExist:
            raise NotFound(detail="User profile not found.")