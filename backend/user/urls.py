from django.urls import path
from .views import checkUser, deleteUser


urlpatterns = [
    path('checkUser/', checkUser, name='check_user'),
    path('deleteUser/', deleteUser, name='delete_user')
]

