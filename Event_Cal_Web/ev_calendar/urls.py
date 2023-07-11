from django.urls import path
from . import views

urlpatterns = [
    path('', views.calendar, name='calendar'),  # Default URL pattern for the root URL
    path('calendar/', views.calendar, name='calendar'),
    path('add_event/', views.add_event, name='add_event'),
    path('update/', views.update, name='update'),
    path('remove/', views.remove, name='remove'),
    path('all_events/', views.all_events, name='all_events'),
]
