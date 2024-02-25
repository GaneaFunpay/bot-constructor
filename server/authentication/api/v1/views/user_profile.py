from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from authentication.api.v1.serializers.user_profile import UserProfileSerializer


class UserProfileAPIView(GenericAPIView):

    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get(self, request):
        print(request.user)
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)