from django.urls import include, path
from rest_framework import routers

from api.views.CadastroView import *
from api.views.LoginView import *

route = routers.DefaultRouter()
route.register(r'cadastro/gerente', CadastroGerenteViewSet)
route.register(r'cadastro/usuario', CadastroUsuarioViewSet)


urlpatterns = [
    path('', include(route.urls)),
    path('login/', LoginView.as_view()),
]