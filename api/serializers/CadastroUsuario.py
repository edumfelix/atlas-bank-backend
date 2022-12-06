from rest_framework import serializers
from ..models.Cadastro import CadastroModel
from django.contrib.auth.hashers import make_password

class CadastroUsuario(serializers.ModelSerializer):
  password = serializers.CharField (
      style={'input_type': 'password'},
      write_only=True,
      label="Senha"
  )
  class Meta:
    model = CadastroModel
    fields = [
      'id',
      'first_name',
      'last_name',
      'username',
      'email',
      'birth_date',
      'password'
    ]

  def create(self, validated_data):
      validated_data['password'] = make_password(validated_data.get('password'))
      return super(CadastroUsuario, self).create(validated_data)