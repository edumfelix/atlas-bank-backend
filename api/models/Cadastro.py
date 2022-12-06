from django.db import models
from django.contrib.auth.models import User
class CadastroModel(User):
  birth_date = models.DateField()
  balance = models.FloatField(default=0)