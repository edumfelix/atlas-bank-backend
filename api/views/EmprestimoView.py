from rest_framework import generics, permissions, viewsets
from api.serializers.EmprestimoSerializer import *
from api.models.Emprestimo import EmprestimoModel

class SolicitarEmprestimo(generics.CreateAPIView):
    queryset = EmprestimoModel.objects.all()
    serializer_class = SolicitarEmprestimo
    permission_classes = [permissions.IsAuthenticated]

class AprovarEmprestimo(viewsets.ModelViewSet):
    queryset = EmprestimoModel.objects.all()
    serializer_class = AprovarEmprestimo
    permission_classes = [permissions.IsAdminUser]
# class AprovarEmprestimo(generics.RetrieveUpdateDestroyAPIView):
#     queryset = EmprestimoModel.objects.all()
#     serializer_class = AprovarEmprestimo
#     permission_classes = [permissions.IsAdminUser]
