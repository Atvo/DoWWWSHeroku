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
	context['approvedQuestions'] = Question.objects.all()
	context['form'] = QuestionForm()
	return render_to_response('contact.html', context)

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
				# new_game = storegame_form.save(commit=False)
				# new_game.author = username
				# new_game.lastPlayed = ""
				# new_game.ratingPoints = 0
				# new_game.rates = 0
				# new_game.save()
		contact(request)