from django.contrib import admin

from authentication.models import UserAccount


@admin.register(UserAccount)
class UserAccountAdmin(admin.ModelAdmin):
    pass
