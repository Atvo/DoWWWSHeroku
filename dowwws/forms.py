from django import forms
from dowwws.models import Question

class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = ('name', 'email', 'message')
        # widgets = {
        #     'name': forms.CharField(attrs={'autocomplete': 'off', 'class': 'form-control'}),
        #     'email': forms.EmailField(attrs={'autocomplete': 'off', 'class': 'form-control'}),
        #     'message': forms.CharField(attrs={'autocomplete': 'off', 'class': 'form-control'}),
        # }
	# name = forms.CharField(label='Your name', max_length=100)
	# email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={'autocomplete': 'off', 'class': 'form-control'}))
	# message = forms.CharField(widget=forms.Textarea)