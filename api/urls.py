from django.urls import include, path
from rest_framework import routers

from api.views.CadastroView import *
from api.views.LoginView import Login
from api.views.LogoutView import Logout
from api.views.ProfileView import ProfileView
from api.views.TestView import setCSRFCookie

route = routers.SimpleRouter()
route.register(r'cadastro/gerente', CadastroGerenteViewSet)
route.register(r'cadastro/usuario', CadastroUsuarioViewSet)


urlpatterns = [
    path('', include(route.urls)),
    path('login/', Login.as_view()),
    path('logout/', Logout.as_view()),    
    path('perfil/', ProfileView.as_view()),
    path('/api/setcsrf/', setCSRFCookie.as_view())
]