from django.shortcuts import render
from .models import Blog, User
from .blogSerializer import BlogSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view


# Create your views here.
@api_view(['GET'])
def getBlogs(request):
    try:
        userObject = User.objects.get(name=request.data.get('username'))
        queryset = Blog.objects.filter(user=userObject)
        serializer = BlogSerializer(queryset, many=True)
        return Response(serializer.data)
    except:
        return Response('Error retrieving user blogs')

@api_view(['POST'])
def createBlog(request):
    serializer = BlogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PATCH'])
def updateBlog(request, pk):
    try:
        blog = Blog.objects.get(id=pk)
        serializer = BlogSerializer(instance=blog, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    except:
        return Response('Blog does not exist') 

@api_view(['DELETE'])
def deleteBlog(request, pk):
    try:
        blog = Blog.objects.get(id=pk)
        blog.delete()
        return Response('Blog deleted successfully')
    except:
        return Response('Blog does not exist')
    
@api_view(['GET'])
def getBlogsTopic(request):
    try:
        topic = request.data.get('topic')
        queryset = Blog.objects.filter(topic=topic)
        serializer = BlogSerializer(queryset, many=True)
        return Response(serializer.data)
    except:
        return Response('Error retrieving blogs by topic')