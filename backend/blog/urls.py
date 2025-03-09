from django.urls import path
from .views import getBlogs, createBlog

urlpatterns = [
    path('blogs/', getBlogs, name='get_blogs'),
    path('create-blog/', createBlog, name='create_blog'),]
