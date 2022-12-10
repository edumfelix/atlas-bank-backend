from django.utils.decorators import method_decorator
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import views
ensure_csrf = method_decorator(ensure_csrf_cookie)

class setCSRFCookie(views.APIView):
    permission_classes = []
    authentication_classes = []
    @ensure_csrf
    def get(self, request):
        return Response("CSRF Cookie set.")