from django.shortcuts import render
from .models import User
from .userSerializer import UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from blog.models import Blog
from blog.blogSerializer import BlogSerializer

#These are the views that will be called when the user makes a request to the server.
#The views will interact with the database and return the appropriate response.
#The views are decorated with the @api_view decorator which allows us to use the function based views.
#The @api_view decorator is used to create a view that responds to HTTP requests.
# Because Django is not a perfect model of the MVC, think of the views as 1/2 of the controller in the MVC model.

# You can call models based on .objects.get() or .objects.filter() to get the data from the database.

# Request.data.get is the usual way to get json data from the request.

@api_view(['POST'])
def checkUser(request):
    username = request.data.get('name')
    password = request.data.get('password')
    
    try:
        userVerified = User.objects.get(name=username, password=password)
        # return all of their blogs
        serializedBlogs = BlogSerializer(Blog.objects.filter(user=userVerified), many=True)
        return Response({'blogs': serializedBlogs.data})
    except User.DoesNotExist:
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response({serializer.errors})
        return Response({'blogs': []})


# @api_view(['POST'])
# def createUser(request):
#     serializer = UserSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#     else:
#         return Response({serializer.errors})
#     return Response({'blogs': []})


@api_view(['DELETE'])
def deleteUser(request):
    user = User.objects.get(id=request.data.get('id'))
    user.delete()
    return Response('User deleted successfully')
 
    