# -*- coding: utf-8 -*-
from django.shortcuts import render, render_to_response
from django.http import HttpResponse
from django.template import RequestContext

from hellodjango.models import *




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
	return render_to_response('contact.html', context)

def travelguide(request):
	print("travelguide")
	context = RequestContext(request)
	return render_to_response('travelguide.html', context)

def newQuestion(request):
	print("newQuestion")
	context = RequestContext(request)
	newQuestion = Question()
	newQuestion.clientName = request.POST.get('name')
	newQuestion.clientEmail = request.POST.get('email')
	newQuestion.question = request.POST.get('message')
	newQuestion.save()
	return render_to_response('contact.html', context)