from django.db import models

class Question(models.Model):
	clientName = models.CharField(null=False,blank=False, max_length=255) # The name of the client
	question = models.TextField(null=False, blank=False) # The Question
	postDate = models.DateField(auto_now=False, auto_now_add=True) # When the question was asked
	isPublished = models.BooleanField(default=False) # Has admin published the question
