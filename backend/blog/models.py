from django.db import models
from user.models import User
# As discussed in the presentation, the model is a class that represents the database table.
# Django implements Object Relational Mapping (ORM) which allows us to interact with the database using Python classes.

class Blog(models.Model):
    title = models.CharField(max_length=100)
    topic = models.CharField(max_length=100,default='None')
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) 
