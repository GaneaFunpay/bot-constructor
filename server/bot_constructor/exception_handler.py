from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler
from django.core.exceptions import ValidationError


def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)
    if response is None and isinstance(exc, ValidationError):
        return Response(data=exc, status=status.HTTP_400_BAD_REQUEST)

    return response
