from django.urls import include, path
from rest_framework import routers

from api.views.CadastroView import *

route = routers.DefaultRouter()
route.register(r'cadastro/gerente', CadastroGerenteViewSet)
route.register(r'cadastro/usuario', CadastroUsuarioViewSet)


urlpatterns = [
    path('', include(route.urls)),
]