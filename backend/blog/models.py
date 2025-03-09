from django.db import models
from user.models import User
# Create your models here.

class Blog(models.Model):
    title = models.CharField(max_length=100)
    topic = models.CharField(max_length=100,default='None')
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True) 
