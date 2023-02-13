from django.contrib import admin
from django.urls import include, path


admin_urlpatterns = [
    path("admin/", admin.site.urls),
]

api_v1_urlpatterns = [
    path(
        f"api/v1/authentication/",
        include(("authentication.api.v1.urls", "authentication"), namespace="api-v1-authentication"),
    )
]

urlpatterns = admin_urlpatterns + api_v1_urlpatterns


