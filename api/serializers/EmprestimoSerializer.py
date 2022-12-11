from rest_framework import serializers
from ..models.Emprestimo import EmprestimoModel
class SolicitarEmprestimo(serializers.ModelSerializer):
  class Meta:
    model = EmprestimoModel
    fields = [
      'emprestimo',
      'motivo'
    ]

class AprovarEmprestimo(serializers.ModelSerializer):
  class Meta:
    model = EmprestimoModel
    fields = [
      'id',
      'emprestimo',
      'motivo',
      'aprovar'
    ]