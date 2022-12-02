from django.db import models

class CadastroGerenteModel(models.Model):
  first_name = models.CharField(max_length=200)
  last_name = models.CharField(max_length=200)
  email = models.EmailField()
  birth_date = models.DateField()
  password = models.CharField(max_length=200)