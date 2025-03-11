from django.urls import path
from .views import getBlogs, createBlog, updateBlog, deleteBlog, getBlogsTopic

urlpatterns = [
    path('blogs/', getBlogs, name='get_blogs'),
    path('create-blog/', createBlog, name='create_blog'),
    path('update-blog/<int:pk>/', updateBlog, name='update_blog'),
    path('delete-blog/<int:pk>/', deleteBlog, name='delete_blog'),
    path('blogs-topic/', getBlogsTopic, name='get_blogs_topic')
    ]
