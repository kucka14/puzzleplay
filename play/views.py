from django.shortcuts import render
from .pi_text import pi_text

# Create your views here.

def index(request):
    
    return render(request, 'play/index.html', {
    
    })
    
def attt(request):
    
    return render(request, 'play/attt.html', {
    
    })
    
def pi(request):

    
    
    return render(request, 'play/pi.html', {
        'pi_text': pi_text,
    
    })
