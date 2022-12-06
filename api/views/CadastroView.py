from rest_framework import viewsets

from ..serializers.CadastroGerente import *
from ..serializers.CadastroUsuario import *
from ..models.Cadastro import *
from rest_framework.permissions import IsAuthenticated

class CadastroUsuarioViewSet(viewsets.ModelViewSet):
    queryset = CadastroModel.objects.all()
    serializer_class = CadastroUsuario

class CadastroGerenteViewSet(viewsets.ModelViewSet):
    queryset = CadastroModel.objects.all()
    serializer_class = CadastroGerente
    permission_classes = [IsAuthenticated]
