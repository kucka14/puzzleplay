from django.shortcuts import render

# Create your views here.

def index(request):
    
    gridlist = [
                    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
                    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
                    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
                    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
                    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
                    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
                    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
                    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
                ]
                
    size = str(100/len(gridlist)) + '%'
    
    return render(request, 'play/index.html', {
        'gridlist': gridlist,
        'size': size,
    })
