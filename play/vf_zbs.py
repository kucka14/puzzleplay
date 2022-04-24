import numpy as np
import random

def flatten(list_of_lists):
    return [item for sublist in list_of_lists for item in sublist]

def generate_dist(mean, sd, size):
    
    dist = np.random.normal(loc=mean, scale=sd, size=size)
    dist.sort()

    divider_count = random.randint(2, 5)
    divider_indices = [0, 100]
    for i in range(divider_count):
        divider_index = random.randint(1, 99)
        while divider_index in divider_indices:
            divider_index = random.randint(1, 99)
        divider_indices.append(divider_index)
    divider_indices.sort()

    dist_divided = []
    count = 1
    while count < len(divider_indices):
        sublist = dist[divider_indices[count - 1]:divider_indices[count]]
        random.shuffle(sublist)
        dist_divided.append(sublist)
        count += 1
        
    random.shuffle(dist_divided)
    
    return flatten(dist_divided)
    
def add_trailing_zeros(number_list, decimal_count):
    number_str_list = []
    for number in number_list:
        number_str = str(number)
        number_couplet = number_str.split('.')
        whole_part = number_couplet[0]
        decimal_part = number_couplet[1]
        while len(decimal_part) < decimal_count:
            decimal_part += '0'
        number_str_list.append(whole_part + '.' + decimal_part)
    return number_str_list
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
