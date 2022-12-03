from rest_framework import serializers
from ..models.CadastroUsuario import CadastroUsuarioModel
class CadastroUsuario(serializers.ModelSerializer):
  password = serializers.CharField (
      style={'input_type': 'password'},
      write_only=True,
      label="Senha"
  )

  password_confirm = serializers.CharField (
      style={'input_type': 'password'},
      write_only=True,
      label="Confirme a senha"
  )
  class Meta:
    model = CadastroUsuarioModel
    fields = (
      'id',
      'first_name',
      'last_name',
      'email',
      'birth_date',
      'password',
      'password_confirm'
    )
