from rest_framework import serializers
from ..models.CadastroUsuario import CadastroUsuarioModel
class CadastroUsuario(serializers.ModelSerializer):
  class Meta:
    model = CadastroUsuarioModel
    fields = (
      'id',
      'first_name',
      'last_name',
      'email',
      'birth_date',
      'password'
    )