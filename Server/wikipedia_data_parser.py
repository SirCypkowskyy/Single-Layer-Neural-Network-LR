import requests
import os
import json


def get_wikipedia_page(title, wiki_lang='en'):
    response = requests.get(f'https://{wiki_lang}.wikipedia.org/w/api.php', params={
        'action': 'query',
        'format': 'json',
        'titles': title,
        'prop': 'extracts',
        'exintro': True,
        'explaintext': True,
    })
    return response.json()['query']['pages']


smallest_size = 2500
smallest_size_article = ''

contents_dict = {}

print('Parsing wikipedia articles...')
with open('wikipedia_articles_titles_to_parse.json', 'r') as f:
    file_content_json = json.load(f)
    for item in file_content_json:
        for lang in file_content_json[item]:
            print(f'Parsing {item} in {lang}...')
            pages = get_wikipedia_page(file_content_json[item][lang], wiki_lang=lang)
            if lang not in contents_dict:
                contents_dict[lang] = {}
            contents_dict[lang][item] = pages[list(pages.keys())[0]]['extract']
            if len(contents_dict[lang][item]) < smallest_size:
                smallest_size = len(contents_dict[lang][item])
                smallest_size_article = item + ' in ' + lang

print(f'Smallest size: {smallest_size}')
print(f'Smallest size article: {smallest_size_article}')
print('Wiki articles parsed. Saving to files...')

for lang in contents_dict:
    for item in contents_dict[lang]:
        contents_dict[lang][item] = contents_dict[lang][item]
        if not os.path.exists(f'Data/{lang}'):
            os.makedirs(f'Data/{lang}')
        with open(f'Data/{lang}/{item}.txt', 'w', encoding='utf-8') as f:
            f.write(contents_dict[lang][item][:int(smallest_size)])

print('Done.')
