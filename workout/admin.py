from django.contrib import admin

from .models import Tag, Workout, WorkoutSession

admin.site.register(Workout)
admin.site.register(WorkoutSession)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ["name"]
    search_fields = ["name"]


# Register your models here.
