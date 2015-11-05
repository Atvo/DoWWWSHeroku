from django import forms
from dowwws.models import Question

class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = ('name', 'email', 'message')