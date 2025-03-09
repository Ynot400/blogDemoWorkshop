from django.shortcuts import render
from .models import Blog, User
from .blogSerializer import BlogSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.


@api_view(['GET'])
def getBlogs(request):
    userObject = User.objects.get(name=request.query_params.get('username'))
    queryset = Blog.objects.filter(user=userObject)
    serializer = BlogSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def createBlog(request):
    serializer = BlogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PATCH'])
def updateBlog(request, pk):
    blog = Blog.objects.get(id=pk)
    serializer = BlogSerializer(instance=blog, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteBlog(request, pk):
    blog = Blog.objects.get(id=pk)
    blog.delete()
    return Response('Blog deleted successfully')