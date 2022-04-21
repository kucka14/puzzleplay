from datetime import datetime
from bs4 import BeautifulSoup

example_profile = {
            'id': '106272247465816160',
            'username': 's4f_leipzig',
            'acct': 's4f_leipzig@beta.birdsite.live',
            'display_name': 'Scientists for Future Leipzig 🇺🇦',
            'locked': False,
            'bot': True,
            'discoverable': True,
            'group': False,
            'created_at': '2021-05-21T00:00:00.000Z',
            'note': 'Kontakt: Leipzig@Scientists4Future.org',
            'url': 'https://beta.birdsite.live/users/s4f_leipzig',
            'avatar': 'https://media.mstdn.social/cache/accounts/avatars/106/272/247/465/816/160/original/967bee1fa7f9b6ff.jpg',
            'avatar_static': 'https://media.mstdn.social/cache/accounts/avatars/106/272/247/465/816/160/original/967bee1fa7f9b6ff.jpg',
            'header': 'https://media.mstdn.social/cache/accounts/headers/106/272/247/465/816/160/original/10ed6ccd30e1a439.jpeg',
            'header_static': 'https://media.mstdn.social/cache/accounts/headers/106/272/247/465/816/160/original/10ed6ccd30e1a439.jpeg',
            'followers_count': 1,
            'following_count': 0,
            'statuses_count': 6111,
            'last_status_at': '2022-04-21',
            'emojis': [],
            'fields': [{'name': 'Official', 'value': '<a href="https://twitter.com/s4f_leipzig" rel="nofollow noopener noreferrer" target="_blank"><span class="invisible">https://</span><span class="ellipsis">twitter.com/s4f_leipzig</span></a>', 'verified_at': None}]
        }
        
def clean_profile_dict(profile_dict):
    soup = BeautifulSoup(profile_dict['note'], features='html.parser')
    description = soup.get_text()
    now = datetime.utcnow()
    then = datetime.fromisoformat(profile_dict['created_at'][:-1])
    cleaned_profile_dict = {
            'banner': profile_dict['header_static'],
            'picture': profile_dict['avatar_static'],
            'username': profile_dict['username'],
            'display_name': profile_dict['display_name'],
            'description': description,
            'followers': profile_dict['followers_count'],
            'following': profile_dict['following_count'],
            'posts': profile_dict['statuses_count'],
            'age': (now - then).days
        }
        
    return cleaned_profile_dict
        
        
