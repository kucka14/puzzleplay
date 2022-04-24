from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('anti-tictactoe/', views.attt, name='attt'),
    path('pi/', views.pi, name='pi'),
    path('zipbobstats/', views.zbs, name='zbs'),
    path('algorithms/', views.sma, name='sma'),
]
