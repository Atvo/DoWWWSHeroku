# -*- coding: utf-8 -*-
from django.shortcuts import render, render_to_response
from django.http import HttpResponse
from django.template import RequestContext

from dowwws.models import *
from dowwws.forms import QuestionForm




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
	print(context)
	return render_to_response('contact.html', context)

def moderate(request):
	print("moderate")
	context = RequestContext(request)
	context['approvedQuestions'] = Question.objects.all().filter(isPublished=False)
	context['form'] = QuestionForm()
	print(context)
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
		firstName = arr[1].split("=")[1].replace("+", " ").replace("%40", "@")
		telNum = arr[2].split("=")[1].replace("+", " ").replace("%40", "@")
		email = arr[3].split("=")[1].replace("+", " ").replace("%40", "@")
		question = arr[4].split("=")[1].replace("+", " ").replace("%40", "@")

		newQuestion.name = firstName #request.POST.get('name')
		print(firstName)
		newQuestion.email = email #request.POST.get('email')
		print(email)
		newQuestion.message = question #request.POST.get('message')
		print(question)
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
		postMessage = arr[0].split("=")[1].replace("%C2%A0", " ")
		print(postMessage)
		postAnswer = arr[1].split("=")[1].replace("+", " ")
		print(postAnswer)
		querySet = Question.objects.all()
		querySet = querySet.filter(message = postMessage.replace(u'\xa0', u' '))
		question = querySet[0]
		print(question)
		#postAnswer = request.POST.get('answer')
		question.answer = postAnswer
		question.isPublished = True
		question.save()
		return moderate(request)