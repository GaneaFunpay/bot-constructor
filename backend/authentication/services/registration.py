from django.contrib.auth import password_validation
from django.utils.translation import gettext
from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.response import Response

from authentication.models import UserAccount
from authentication.exceptions import InvalidPasswordError


class RegistrationService:
    def __init__(self, user_data):
        self.user_data = user_data

    def __validate_email(self) -> None:
        if UserAccount.objects.filter(email=self.user_data.get('email')).exists():
            raise ValidationError(gettext("Could not create account with this email."))

    def __validate_password(self) -> None:
        try:
            password_validation.validate_password(self.user_data.get('password'))
        except ValidationError as e:
            raise InvalidPasswordError(e.messages) from e

    def __validate(self) -> None:
        self.__validate_email()
        self.__validate_password()

    def register(self):
        self.__validate()
        new_user = UserAccount.objects.create(**self.user_data)
        new_user.set_password(self.user_data.get('password'))
        new_user.save()
        return Response(status=status.HTTP_201_CREATED)
