from django.urls import path
from .views import getBlogs, createBlog, updateBlog, deleteBlog, getBlogsTopic



# As discussed in the presentation, the urls.py file is used to map the URL to the views.
# For the sake of the MVC model, think of the urls.py as 1/2 of the controller in the MVC model.

urlpatterns = [
    path('blogs/', getBlogs, name='get_blogs'),
    path('create-blog/', createBlog, name='create_blog'),
    path('update-blog/<int:pk>/', updateBlog, name='update_blog'),
    path('delete-blog/<int:pk>/', deleteBlog, name='delete_blog'),
    path('blogs-topic/', getBlogsTopic, name='get_blogs_topic')
    ]
