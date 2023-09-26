from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static


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
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
