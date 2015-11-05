from django.db import models

class Question(models.Model):
	name = models.CharField(null=False,blank=False, max_length=255) # The name of the client
	email = models.CharField(null=False,blank=False, max_length=255) # The name of the client
	message = models.TextField(null=False, blank=False) # The Question
	answer = models.TextField(null=False, blank=False, default="Not answered yet") # The Question
	postDate = models.DateField(auto_now=False, auto_now_add=True) # When the question was asked
	isPublished = models.BooleanField(default=False) # Has admin published the question

	def __str__(self):
		return self.name + "\n" + self.message + "\n" + self.answer