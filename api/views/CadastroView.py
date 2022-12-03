from rest_framework import viewsets

from ..serializers.CadastroGerente import *
from ..serializers.CadastroUsuario import *
from ..models.CadastroGerente import *
from ..models.CadastroUsuario import *
from rest_framework.permissions import IsAuthenticated

class CadastroUsuarioViewSet(viewsets.ModelViewSet):
    queryset = CadastroUsuarioModel.objects.all()
    serializer_class = CadastroUsuario

class CadastroGerenteViewSet(viewsets.ModelViewSet):
    queryset = CadastroGerenteModel.objects.all()
    serializer_class = CadastroGerente
    permission_classes = [IsAuthenticated]
