from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('anti-tictactoe/', views.attt, name='attt'),
    path('pi/', views.pi, name='pi'),
]
