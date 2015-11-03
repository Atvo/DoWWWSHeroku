from django.db import models

class Question(models.Model):
	clientName = models.CharField(null=False,blank=False, max_length=255) # The name of the client
	clientEmail = models.CharField(null=False,blank=False, max_length=255) # The name of the client
	question = models.TextField(null=False, blank=False) # The Question
	postDate = models.DateField(auto_now=False, auto_now_add=True) # When the question was asked
	isPublished = models.BooleanField(default=False) # Has admin published the question

class GameGenre(models.Model):
	"""Stores the available game genres. The superuser should create these beforehand."""
	genre = models.CharField(null=False, blank=False, max_length=255, unique=True) #Genren nimi
	desc = models.TextField(null=False, blank=False, unique=True) #Genren kuvaus

	def __str__(self):
		return self.genre

class GameGeadsnre(models.Model):
	"""Stores the available game genres. The superuser should create these beforehand."""
	genre = models.CharField(null=False, blank=False, max_length=255, unique=True) #Genren nimi
	desc = models.TextField(null=False, blank=False, unique=True) #Genren kuvaus

	def __str__(self):
		return self.genre