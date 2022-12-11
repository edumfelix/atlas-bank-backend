# Generated by Django 4.1.2 on 2022-12-11 19:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import phone_field.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cadastromodel',
            name='cep',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='cadastromodel',
            name='cpf',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='cadastromodel',
            name='gender',
            field=models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1, null=True),
        ),
        migrations.AddField(
            model_name='cadastromodel',
            name='phone',
            field=phone_field.models.PhoneField(max_length=31, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='cadastromodel',
            name='balance',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
        migrations.CreateModel(
            name='EmprestimoModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('emprestimo', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('aprovar', models.BooleanField(default=0)),
                ('motivo', models.CharField(max_length=200)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
