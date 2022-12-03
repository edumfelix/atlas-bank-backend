from rest_framework import serializers
from ..models.CadastroGerente import CadastroGerenteModel

class CadastroGerente(serializers.ModelSerializer):
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
    model = CadastroGerenteModel
    fields = [
      'id',
      'first_name',
      'last_name',
      'username',
      'email',
      'birth_date',
      'password',
      'password_confirm'
    ]