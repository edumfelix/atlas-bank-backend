from django.urls import include, path
from rest_framework import routers

from api.views.CadastroView import *
from api.views.LoginView import Login
from api.views.LogoutView import Logout
from api.views.ProfileView import ProfileView
from api.views.TestView import setCSRFCookie
from api.views.FrontEndView import index
from api.views.EmprestimoView import SolicitarEmprestimo, AprovarEmprestimo

route = routers.SimpleRouter()
route.register(r'cadastro/gerente', CadastroGerenteViewSet)
route.register(r'cadastro/usuario', CadastroUsuarioViewSet)
route.register(r'aprovar/emprestimo', AprovarEmprestimo)


urlpatterns = [
    path('', include(route.urls)),
    path('', index, name='index'),
    path('login/', Login.as_view()),
    path('logout/', Logout.as_view()),    
    path('perfil/', ProfileView.as_view()),

    path('solicitar/emprestimo/', SolicitarEmprestimo.as_view()),
    # path('aprovar/emprestimo/<int:pk>', AprovarEmprestimo.as_view()),
    
    path('api/setcsrf/', setCSRFCookie.as_view())
]