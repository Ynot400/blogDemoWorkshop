from django.urls import path
from .views import checkUser, createUser, deleteUser


urlpatterns = [
    path('checkUser/', checkUser, name='check_user'),
    path('createUser/', createUser, name='create_user'),
    path('deleteUser/', deleteUser, name='delete_user')
]

