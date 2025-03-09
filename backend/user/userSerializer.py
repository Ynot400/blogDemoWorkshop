# Serializers convert our python model objects to JSON objects for the frontend to consume
# Serializers also convert JSON objects from the frontend to python model objects
# Serializers are used in the views.py file to convert the data to and from the frontend
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'