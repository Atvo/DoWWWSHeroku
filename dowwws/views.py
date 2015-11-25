# -*- coding: utf-8 -*-
from django.shortcuts import render, render_to_response
from django.http import HttpResponse
from django.template import RequestContext
from django.core.mail import send_mail

from dowwws.models import *
from dowwws.forms import QuestionForm


OUR_EMAIL = "sittingmat@email.com"

def index(request):
	print("JOU")
	context = RequestContext(request)
	return render_to_response('index.html', context)

def product(request):
	print("Product")
	context = RequestContext(request)
	return render_to_response('product.html', context)

def contact(request):
	print("contact")
	context = RequestContext(request)
	context['publishedQuestions'] = Question.objects.all().filter(isPublished=True)
	context['form'] = QuestionForm()
	#print(context)
	return render_to_response('contact.html', context)

def moderate(request):
	print("moderate")
	context = RequestContext(request)
	context['approvedQuestions'] = Question.objects.all().filter(isAnswered=False)
	context['form'] = QuestionForm()
	#print(context)
	return render_to_response('moderate.html', context)

def travelguide(request):
	print("travelguide")
	context = RequestContext(request)
	return render_to_response('travelguide.html', context)

def newQuestion(request):
	print("newQuestion")
	if request.method == 'POST':
		context = RequestContext(request)
		#form = QuestionForm(data=request.POST)
		#newQuestion = form.save(commit=False)
		print(request)
		newQuestion = Question()
		serializedStr = request.POST.get('serialized')
		print(serializedStr)
		arr = serializedStr.split("&")
		firstName = arr[1].split("=")[1].replace("+", " ").replace("%40", "@").replace("%3F", "?")
		telNum = arr[2].split("=")[1].replace("+", " ").replace("%40", "@").replace("%3F", "?")
		email = arr[3].split("=")[1].replace("+", " ").replace("%40", "@").replace("%3F", "?")
		#title = arr[4].split("=")[1].replace("+", " ").replace("%40", "@").replace("%3F", "?")
		question = arr[4].split("=")[1].replace("+", " ").replace("%40", "@").replace("%3F", "?")

		public = None
		emailResponse = None

		if len(arr) > 5:
			checkboxValue = arr[5].split("=")[1].replace("+", " ").replace("%40", "@").replace("%3F", "?")
			if arr[5].split("=")[0] == "public":
				public = "on"
				print("Public ON")
			else:
				print(arr[5].split("=")[0])
				print("EmailResponse ON")
				emailResponse = "on"
		if len(arr) > 6:
			emailResponse = arr[6].split("=")[1].replace("+", " ").replace("%40", "@").replace("%3F", "?")

		newQuestion.name = firstName #request.POST.get('name')
		print(firstName)
		newQuestion.email = email #request.POST.get('email')
		print(email)
		newQuestion.message = question #request.POST.get('message')
		print(question)
		#newQuestion.title = title #request.POST.get('message')
		print(public)
		print(public == None)
		if public == None:
			newQuestion.public = False
			print("public = False")

		print(emailResponse)
		print(emailResponse != None)
		print(emailResponse == "on")
		if emailResponse != None and emailResponse == "on":
			newQuestion.emailResponse = True
			print("emailResponse = True")
		newQuestion.save()
		return contact(request)

def newReply(request):
	print("newReply")
	if request.method == 'POST':
		context = RequestContext(request)
		print(request)
		newQuestion = Question()
		serializedStr = request.POST.get('serialized')
		print(serializedStr)
		arr = serializedStr.split("&")
		postMessage = arr[0].split("=")[1].replace("%C2%A0", " ").replace("%3F", "?")
		print(postMessage)
		postTitle = arr[1].split("=")[1].replace("+", " ").replace("%3F", "?")
		print(postTitle)
		postAnswer = arr[2].split("=")[1].replace("+", " ").replace("%3F", "?")
		print(postAnswer)

		public = None
		emailResponse = None

		if len(arr) > 3:
			checkboxValue = arr[3].split("=")[1].replace("+", " ").replace("%3F", "?")
			if arr[3].split("=")[0] == "public":
				public = "on"
			else: 
				emailResponse = "on"
			print(public)

		if len(arr) > 4:
			emailResponse = arr[4].split("=")[1].replace("+", " ").replace("%3F", "?")
			print(emailResponse)

		querySet = Question.objects.all()
		querySet = querySet.filter(message = postMessage.replace(u'\xa0', u' '))
		question = querySet[0]
		print(question)
		#postAnswer = request.POST.get('answer')
		question.answer = postAnswer
		question.isAnswered = True
		if public != None and public == "on":
			question.isPublished = True

		if emailResponse != None and emailResponse == "on":
			print("send Mail")
			send_mail('Subject here', 'Here is the message.', OUR_EMAIL,
    [question.email], fail_silently=False)


			#send_mail('Subject here', 'Here is the message.', 'from@example.com',
    #['to@example.com'], fail_silently=False)

		question.save()
		return moderate(request)