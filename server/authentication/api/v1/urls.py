from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from authentication.api.v1.views import RegistrationAPIView
from authentication.api.v1.views.user_profile import UserProfileAPIView


urlpatterns = [
    path("registration/", RegistrationAPIView.as_view(), name="registration"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('user-profile/', UserProfileAPIView.as_view(), name='user_profile')
]
