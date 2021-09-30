from django.shortcuts import render

# Create your views here.

def index(request):
    
    return render(request, 'play/index.html', {
    
    })
    
def attt(request):
    
    return render(request, 'play/attt.html', {
    
    })
