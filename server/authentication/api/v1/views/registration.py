from rest_framework.generics import GenericAPIView

from authentication.api.v1.serializers import RegistrationSerializer
from authentication.services.registration import RegistrationService


class RegistrationAPIView(GenericAPIView):

    serializer_class = RegistrationSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = RegistrationService(user_data=serializer.validated_data).register()
        return response
