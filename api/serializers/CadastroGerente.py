from rest_framework import serializers
from ..models.Cadastro import CadastroModel
from django.contrib.auth.hashers import make_password

class CadastroGerente(serializers.ModelSerializer):
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
      'cpf', 
      'cep', 
      'gender',
      'phone',
      'birth_date',
      'is_staff',
      'password'
    ]

  def create(self, validated_data):
      validated_data['password'] = make_password(validated_data.get('password'))
      return super(CadastroGerente, self).create(validated_data)