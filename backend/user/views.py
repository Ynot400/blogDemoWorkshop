from django.shortcuts import render
from .models import User
from .userSerializer import UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.

@api_view(['POST'])
def checkUser(request):
    username = request.data.get('username')
    password = request.data.get('password')
    try:
        User.objects.get(username=username, password=password)
        # return all of their blogs
        return Response({'authenticated': True})
    except User.DoesNotExist:
        return Response({'authenticated': False})


@api_view(['POST'])
def createUser(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteUser(request):
    user = User.objects.get(id=request.data.get('id'))
    user.delete()
    return Response('User deleted successfully')
 
    