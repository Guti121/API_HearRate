from django.urls import re_path
from apps.frecuencia_app.api.consumers import FrecuenciaConsumer

websocket_urlpatterns = [
    re_path(r'ws/frecuencia/', FrecuenciaConsumer.as_asgi()),
]
