from django.conf import settings
import django.contrib.auth.models
from django.db import models
import django.db.models.deletion

class EmprestimoModel(models.Model):
    emprestimo = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    aprovar = models.BooleanField(default=0)
    motivo = models.CharField(max_length=200)

    user = ('user_ptr', models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True))