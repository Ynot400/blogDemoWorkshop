from django.shortcuts import render
from .models import Blog, User
from .blogSerializer import BlogSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

#These are the views that will be called when the user makes a request to the server.
#The views will interact with the database and return the appropriate response.
#The views are decorated with the @api_view decorator which allows us to use the function based views.
#The @api_view decorator is used to create a view that responds to HTTP requests.
# Because Django is not a perfect model of the MVC, think of the views as 1/2 of the controller in the MVC model.

# You can call models based on .objects.get() or .objects.filter() to get the data from the database.

# Request.data.get is the usual way to get json data from the request.

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
        print(request.data.get('topic'))
        topic = request.data.get('topic')
        queryset = Blog.objects.filter(topic=topic)
        serializer = BlogSerializer(queryset, many=True)
        print(serializer.data)
        return Response(serializer.data)
    except:
        return Response('Error retrieving blogs by topic')