from rest_framework import permissions, views, status
from django.contrib.auth import login
from rest_framework.response import Response
from api.serializers.LoginSerializer import LoginSerializer

class Login(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = LoginSerializer(data=self.request.data,
            context={ 'request': self.request })
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(None, status=status.HTTP_202_ACCEPTED)