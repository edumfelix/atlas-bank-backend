from rest_framework import serializers
from ..models.CadastroGerente import CadastroGerenteModel
class CadastroGerente(serializers.ModelSerializer):
  class Meta:
    model = CadastroGerenteModel
    fields = (
      'id',
      'first_name',
      'last_name',
      'email',
      'birth_date',
      'password'
    )