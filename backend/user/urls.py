from django.urls import path
from .views import checkUser, deleteUser

# As discussed in the presentation, the urls.py file is used to map the URL to the views.
# For the sake of the MVC model, think of the urls.py as 1/2 of the controller in the MVC model.

urlpatterns = [
    path('checkUser/', checkUser, name='check_user'),
    path('deleteUser/', deleteUser, name='delete_user')
]

