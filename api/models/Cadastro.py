from django.db import models
from django.contrib.auth.models import User
from phone_field import PhoneField
class CadastroModel(User):
  birth_date = models.DateField()
  balance = models.FloatField(default=0)
  cpf = models.CharField(max_length=20, null=True)
  cep = models.CharField(max_length=20, null=True)
  phone = PhoneField(null=True, blank=False, unique=True)
  GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
  gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True)
  # cpf, genero, telefone, cep 