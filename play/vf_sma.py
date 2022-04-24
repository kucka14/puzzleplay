from datetime import datetime
from bs4 import BeautifulSoup

example_profile = {
            'id': '106272247465816160',
            'username': 'cf_gauss_55',
            'acct': 'Example U',
            'display_name': 'Carl F Gauss',
            'locked': False,
            'bot': True,
            'discoverable': True,
            'group': False,
            'created_at': '1868-05-21T00:00:00.000Z',
            'note': 'German mathematician, interested in geometry, number theory, astronomy, etc. I like to say that it is not knowledge, but the act of learning, not the possession of but the act of getting there, which grants the greatest enjoyment.',
            'url': 'https://beta.birdsite.live/users/s4f_leipzig',
            'avatar': 'https://media.mstdn.social/cache/accounts/avatars/106/272/247/465/816/160/original/967bee1fa7f9b6ff.jpg',
            'avatar_static': 'https://media.mstdn.social/cache/accounts/avatars/106/272/247/465/816/160/original/967bee1fa7f9b6ff.jpg',
            'header': 'https://media.mstdn.social/cache/accounts/headers/106/272/247/465/816/160/original/10ed6ccd30e1a439.jpeg',
            'header_static': 'https://media.mstdn.social/cache/accounts/headers/106/272/247/465/816/160/original/10ed6ccd30e1a439.jpeg',
            'followers_count': 3684384,
            'following_count': 4,
            'statuses_count': 7,
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
        
        
