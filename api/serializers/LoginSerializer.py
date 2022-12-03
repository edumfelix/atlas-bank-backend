from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class LoginUsuario(serializers.ModelSerializer):
  email = serializers.EmailField (
    write_only=True,
    label="Email:"
  )
  password = serializers.CharField (
    style={'input_type': 'password'},
    trim_whitespace=False,
    write_only=True,
    label="Senha:"
  )
  def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'),
                                email=email, password=password)
            if not user:
                msg = 'Access denied: wrong email or password.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Both "email" and "password" are required.'
            raise serializers.ValidationError(msg, code='authorization')
        attrs['user'] = user
        return attrs
        
  class Meta:
    model = User
    fields = (
      'email',
      'password'
    )

