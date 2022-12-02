from rest_framework import viewsets
from rest_framework.response import Response

from ..serializers.CadastroGerente import *
from ..serializers.CadastroUsuario import *
from ..models.CadastroGerente import *
from ..models.CadastroUsuario import *
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.settings import api_settings

class CadastroUsuarioViewSet(viewsets.ModelViewSet):
    queryset = CadastroUsuarioModel.objects.all()
    serializer_class = CadastroUsuario

class CadastroGerenteViewSet(viewsets.ModelViewSet):
    queryset = CadastroGerenteModel.objects.all()
    serializer_class = CadastroGerente
    permission_classes = [IsAuthenticated]
    # def get_queryset(self):
    #     email = self.request.query_params.get('email')
    #     id_access_level = self.request.query_params.get('id_access_level')
    #     password = self.request.query_params.get('password')
    #     return self.__filter_params(email, id_access_level, password)


    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    # def list(self, request, *args, **kwargs):
    #     queryset = self.filter_queryset(self.get_queryset())
    #     page = self.paginate_queryset(queryset)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)

    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response(serializer.data)

    # def update(self, request, *args, **kwargs):
    #     partial = kwargs.pop('partial', False)
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data, partial=partial)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)

    #     if getattr(instance, '_prefetched_objects_cache', None):
    #         # If 'prefetch_related' has been applied to a queryset, we need to
    #         # forcibly invalidate the prefetch cache on the instance.
    #         instance._prefetched_objects_cache = {}

    #     return Response(serializer.data)

    # def destroy(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)

    # def __filter_params(self, email, id_access_level, password):
    #     queryset = User.objects.all()
    #     if email:
    #         queryset = queryset.filter(email__contains=email.upper())
    #     if id_access_level:
    #         queryset = queryset.filter(id_access_level=id_access_level)
    #     return queryset