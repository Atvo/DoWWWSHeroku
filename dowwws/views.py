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
		form = QuestionForm(data=request.POST)
		newQuestion = form.save(commit=False)
		# newQuestion.clientName = request.POST.get('name')
		# newQuestion.clientEmail = request.POST.get('email')
		# newQuestion.question = request.POST.get('message')
		newQuestion.save()
		return contact(request)

def newReply(request):
	print("newReply")
	if request.method == 'POST':
		context = RequestContext(request)
		form = QuestionForm(data=request.POST)
		#newQuestion = form.save(commit=False)
		postMessage = request.POST.get('message')
		print(postMessage)
		question = Question.objects.all().filter(message = postMessage)[0]
		postAnswer = request.POST.get('answer')
		print(postAnswer)
		question.answer = postAnswer
		question.isPublished = True
		question.save()
		return moderate(request)