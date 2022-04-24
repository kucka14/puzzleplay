from django.shortcuts import render
from .pi_text import pi_text

import requests
import json

import random

from .vf_zbs import generate_dist, add_trailing_zeros
from .vf_sma import example_profile, clean_profile_dict

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
    
def zbs(request):

    zips_premean = random.randint(60, 120)
    bops_premean = random.randint(60, 120)
    while abs(bops_premean - zips_premean) < 30:
        bops_premean = random.randint(45, 120)
        
    zips_sd = (random.randint(5, 15)/100) * zips_premean
    bops_sd = (random.randint(5, 15)/100) * bops_premean
    
    zips_times = generate_dist(zips_premean, zips_sd, 100)
    bops_times = generate_dist(bops_premean, bops_sd, 100)
    
    zips_times = [round(time, 2) for time in zips_times]
    zips_mean = sum(zips_times) / len(zips_times)
    zips_times_display = add_trailing_zeros(zips_times, 2)
    zips_mean_display = add_trailing_zeros([round(zips_mean, 2)], 2)[0]
    bops_times = [round(time, 2) for time in bops_times]
    bops_mean = sum(bops_times) / len(bops_times)
    bops_times_display = add_trailing_zeros(bops_times, 2)
    bops_mean_display = add_trailing_zeros([round(bops_mean, 2)], 2)[0]
    
    winner = 'Bops';
    if (zips_mean < bops_mean) {
        winner = 'Zips';
    }
    
    data_dict = {
        'zipsMean': zips_mean_display,
        'zipsTimes': zips_times_display,
        'bopsMean': bops_mean_display,
        'bopsTimes': bops_times_display,
        'winner': winner,
    }
    
    return render(request, 'play/zbs.html', {
        'data_dict': data_dict,
    
    })
    
    
    
    
    
    
    
    
def sma(request):

    response = requests.get("https://mstdn.social/api/v1/directory?limit=20")
    profile_list = json.loads(response.text)
    
    cleaned_profile_list = [clean_profile_dict(profile_dict) for profile_dict in profile_list]

    return render(request, 'play/sma.html', {
        
        'profile': clean_profile_dict(example_profile),
        'profiles': cleaned_profile_list,
        
    })
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
