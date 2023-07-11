from django.shortcuts import render
from . models import Event
from django.http import HttpResponse, JsonResponse
from django.core import serializers
import json
from django.urls import reverse

# Create your views here.
def calendar(request):
    all_events = Event.objects.all()
    context = {
        "events": all_events,
    }
    return render(request,'base.html', context)

#Display all_events.
def all_events(request):
    all_events = Event.objects.all()
    out = []
    for event in all_events:
        out.append({
            'title': event.title,
            'id': event.id,
            'start': event.start.strftime("%m/%d/%Y, %H:%M:%S"),
            'end': event.end.strftime("%m/%d/%Y, %H:%M:%S"),
        })
        return JsonResponse(out, safe=False)

#Create event
def add_event(request):
    start = request.GET.get("start", None)
    end = request.GET.get("end", None)
    title = request.GET.get("title", None)
    event = Event(title=str(title), start=start, end=end)
    event.save()
    data = {}
    return JsonResponse(data)

#Update Event
def update(request):
    start = request.GET.get("start", None)
    end = request.GET.get("end", None)
    title = request.GET.get("title", None)
    id = request.GET.get("id", None)
    event = Event.objects.get(id=id)
    event.start = start
    event.end = end
    event.title = title
    event.save()
    data = {}
    return JsonResponse(data)

#Remove event
def remove(request):
    id = request.GET.get("id", None)
    event = Event.objects.get(id=id)
    event.delete()
    data = {}
    return JsonResponse(data)





