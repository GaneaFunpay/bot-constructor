from rest_framework import serializers

from authentication.models import UserAccount


class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True, max_length=128)
    password = serializers.CharField(write_only=True, max_length=128)
    first_name = serializers.CharField(required=True, max_length=30)
    last_name = serializers.CharField(required=True, max_length=30)

    class Meta:
        model = UserAccount
        fields = ("email", "first_name", "last_name", "password")
