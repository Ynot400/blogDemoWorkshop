from django.db import models

# As discussed in the presentation, the model is a class that represents the database table.
# Django implements Object Relational Mapping (ORM) which allows us to interact with the database using Python classes.

class User(models.Model):
    name = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name