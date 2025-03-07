from django import forms
from .models import Workout, WorkoutSession

BODY_PARTS = (
    ("Chest", "Chest"),
    ("Back", "Back"),
    ("Legs", "Legs"),
    ("Shoulders", "Shoulders"),
    ("Arms", "Arms"),
    ("Core", "Core"),
    ("Cardio", "Cardio"),
    ("Other", "Other"),
)


class WorkoutSessionForm(forms.ModelForm):
    class Meta:
        model = WorkoutSession
        fields = ['name']

class WorkoutForm(forms.ModelForm):
    weight_carried = forms.IntegerField(
        label='Weight Carried (kgs)',
        widget=forms.NumberInput(attrs={'min': '1', 'max': '200', 'step': '1'})
    )
    sets = forms.IntegerField(
        label='Sets',
        widget=forms.NumberInput(attrs={'min': '1', 'max': '10', 'step': '1'})
    )
    reps = forms.IntegerField(
        label='Reps',
        widget=forms.NumberInput(attrs={'min': '1', 'max': '40', 'step': '1'})
    )
    body_part = forms.ChoiceField(choices=BODY_PARTS)

    class Meta:
        model = Workout
        fields = ['session', 'weight_carried', 'sets', 'reps', 'body_part']

class DeleteWorkoutSessionForm(forms.Form):  
    session_id = forms.IntegerField(widget=forms.HiddenInput())

class DeleteWorkoutForm(forms.Form):
    workout_id = forms.IntegerField(widget=forms.HiddenInput())
