from django.shortcuts import render
from .models import User
from .userSerializer import UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from blog.models import Blog
from blog.blogSerializer import BlogSerializer
# Create your views here.

@api_view(['POST'])
def checkUser(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    try:
        userVerified = User.objects.get(name=username, password=password)
        # return all of their blogs
        serializedBlogs = BlogSerializer(Blog.objects.filter(user=userVerified), many=True)
        return Response({'blogs': serializedBlogs.data})
    except User.DoesNotExist:
        return Response({'authenticated': False})


@api_view(['POST'])
def createUser(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors)
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteUser(request):
    user = User.objects.get(id=request.data.get('id'))
    user.delete()
    return Response('User deleted successfully')
 
    