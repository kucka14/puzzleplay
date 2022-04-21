from django.shortcuts import render
from .pi_text import pi_text

import scipy.stats as stats

import requests
import json
from .view_functions import example_profile, clean_profile_dict

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
    
def zps(request):

    a, b = 500, 600
    mu, sigma = 550, 30
    dist = stats.truncnorm((a - mu) / sigma, (b - mu) / sigma, loc=mu, scale=sigma)

    values = dist.rvs(1000)

    return render(request, 'play/zps.html', {
#        'zip_numbers': zip_numbers,
    
    })
    
def sma(request):

    response = requests.get("https://mstdn.social/api/v1/directory?limit=20")
    profile_list = json.loads(response.text)
    
    cleaned_profile_list = [clean_profile_dict(profile_dict) for profile_dict in profile_list]

    return render(request, 'play/sma.html', {
        
        'profile': cleaned_profile_list[0],
        'profiles': cleaned_profile_list,
        
    })
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
