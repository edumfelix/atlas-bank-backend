from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import logout
class Logout(APIView):
    def get(self, request, format=None):
        logout(request)
        return Response(status=status.HTTP_202_ACCEPTED)
