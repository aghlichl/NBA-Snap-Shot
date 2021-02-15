import urllib3
from bs4 import BeautifulSoup
import datetime
import json
from unidecode import unidecode
import base64

http = urllib3.PoolManager()

def gitAPI(raw_content):
    access_token = "fe52099d29ddadbfcf18e70b56cf2d1f51fa24fa" 
    headers = {'Authorization':"Token "+access_token}
    url = "https://api.github.com/repos/aghlichl/NBA-Snap-Shot/contents/data/nbaTEST.json"
    #oh
    # res = requests.get(url, headers=headers).json()
    raw_res = http.request('GET', url, headers=headers)
    raw_res = raw_res.data
    res = json.loads(raw_res)
    sha1 = res["sha"]
    raw_content = raw_content.encode()
    content =  base64.b64encode(raw_content)
    content = content.decode()
    encoded_body = json.dumps({"sha": sha1, "message": "updated stats through GitHub API", "content": content })
    resPut = http.request('PUT', url, headers=headers, body=encoded_body)
    print(resPut.data)
    # resPut = requests.put(url, headers=headers, json={"sha": sha1, "message": "updated stats through GitHub API", "content": content }) 

def is_ascii(s):
    return all(ord(c) < 128 for c in s)

def nba_scraper():
    url = 'https://www.basketball-reference.com/leagues/NBA_2021_per_game.html'
    pic_id_url_2019 = 'http://data.nba.net/data/10s/prod/v1/2019/players.json'
    pic_id_url_2020 = 'http://data.nba.net/data/10s/prod/v1/2020/players.json'

    raw_stats2021 = http.request('GET', url)
    stats2021 = raw_stats2021.data
    # stats2021 = requests.get(url)
    raw_pic_id_2021 = http.request('GET', pic_id_url_2020)
    pic_id_json_2021 = json.loads(raw_pic_id_2021.data)
    # pic_id_2021 = requests.get(pic_id_url_2020)
    raw_pic_id_2020 = http.request('GET', pic_id_url_2019)
    pic_id_json_2020 = json.loads(raw_pic_id_2020.data)

    # pic_id_2020 = requests.get(pic_id_url_2019)
    # pic_id_json_2021 = pic_id_2021.json()
    # pic_id_json_2020 = pic_id_2020.json()
    stats2021
    pic_id_hash = dict()
    nba_hash = dict()
    nba_team_hash = {
        "ATL": 'ATL',
        "BOS": 'BOS',
        "BKN": 'BRK',
        "CHI": 'CHI',
        "CHA": 'CHO',
        "CLE": 'CLE',
        "DAL": 'DAL',
        "DEN": 'DEN',
        "DET": 'DET',
        "GSW": 'GSW',
        "HOU": 'HOU',
        "IND": 'IND',
        "LAC": 'LAC',
        "LAL": 'LAL',
        "MEM": 'MEM',
        "MIA": 'MIA',
        "MIL": 'MIL',
        "MIN": 'MIN',
        "NO": 'NOP',
        "NYK": 'NYK',
        "OKC": 'OKC',
        "ORL": 'ORL',
        "PHI": 'PHI',
        "PHX": 'PHO',
        "POR": 'POR',
        "SAC": 'SAC',
        "SAS": 'SAS',
        "TOR": 'TOR',
        "UTH": 'UTA',
        "WAS": 'WAS'
    }
    formatted_nba_hash ={
        'name': 'NBA',	
        'children': [{
                'name': 'ATL',
                'children': []
            },
            {
                'name': 'BOS',
                'children': []
            },
            {
                'name': 'BKN',
                'children': []
            },
            {
                'name': 'CHI',
                'children': []
            },
            {
                'name': 'CHA',
                'children': []
            },
            {
                'name': 'CLE',
                'children': []
            },
            {
                'name': 'DAL',
                'children': []
            },
            {
                'name': 'DEN',
                'children': []
            },

            {
                'name': 'DET',
                'children': []
            },
            {
                'name': 'GSW',
                'children': []
            },
            {
                'name': 'HOU',
                'children': []
            },
            {
                'name': 'IND',
                'children': []
            },
            {
                'name': 'LAC',
                'children': []
            },
            {
                'name': 'LAL',
                'children': []
            },
            {
                'name': 'MEM',
                'children': []
            },
            {
                'name': 'MIA',
                'children': []
            },
            {
                'name': 'MIL',
                'children': []
            },
            {
                'name': 'MIN',
                'children': []
            },
            {
                'name': 'NO',
                'children': []
            },
            {
                'name': 'NYK',
                'children': []
            },
            {
                'name': 'OKC',
                'children': []
            },
            {
                'name': 'ORL',
                'children': []
            },
            {
                'name': 'PHI',
                'children': []
            },
            {
                'name': 'PHX',
                'children': []
            },
            {
                'name': 'POR',
                'children': []
            },
            {
                'name': 'SAC',
                'children': []
            },
            {
                'name': 'SAS',
                'children': []
            },
            {
                'name': 'TOR',
                'children': []
            },
            {
                'name': 'UTH',
                'children': []
            },
            {
                'name': 'WAS',
                'children': []
            }
        ]
    }
    headers = ['Name', 'Pos', 'Age', 'Tm', 'G', 'GS', 'MP', 'FG', 'FGA', 'FG%', '3P', '3PA', '3P%', '2P', '2PA', '2P%', 'eFG%', 'FT', 'FTA', 'FT%', 'ORB', 'DRB', 'TRB', 'AST', 'STL', 'BLK', 'TOV', 'PF', 'PTS']
    # soup = BeautifulSoup(stats2021.content, 'lxml')
    soup = BeautifulSoup(stats2021, 'lxml')
    player_stats = soup.find_all('td')

    for j in pic_id_json_2020['league']['standard']:
        curr_first_name = j['firstName']
        curr_last_name = j['lastName'].split(" ")[0]
        curr_name = curr_first_name + ' ' + curr_last_name
        pic_id_hash[curr_name] = j['personId']

    for j in pic_id_json_2021['league']['standard']:
        curr_first_name = j['firstName']
        curr_last_name = j['lastName'].split(" ")[0]
        curr_name = curr_first_name + ' ' + curr_last_name
        pic_id_hash[curr_name] = j['personId']    


    for i in range(len(player_stats)):
        if i % 29 == 0:
            if is_ascii(player_stats[i].text) == False:
                curr_player_name = unidecode(player_stats[i].text)
            else:
                curr_player_name = player_stats[i].text
            
            curr_player_name = curr_player_name.split(" ")[:2]
            curr_player_name = " ".join(curr_player_name)
            img_url_code = pic_id_hash.get(curr_player_name) 

            nba_hash[(player_stats[i].text)] = {'name': player_stats[i].text, "img": "<img id='cover-img' src='https://cdn.nba.com/headshots/nba/latest/260x190/{}.png' />".format(img_url_code) }
        else:    
            nba_hash[(player_stats[(i-(i % 29))].text)][headers[(i % 29)]] = (player_stats[i].text)

    for full_name in nba_hash:
        for i in formatted_nba_hash['children']:
            if nba_hash[full_name]['Tm'] == nba_team_hash[i['name']]:
                i['children'].append(nba_hash[full_name])
        




    # with open('data/statistics.json', 'w', encoding='utf-8') as writeJSON:
    #     json.dump(formatted_nba_hash, writeJSON, ensure_ascii=False)

    formatted_nba_json = json.dumps(formatted_nba_hash)

    gitAPI(formatted_nba_json)

    return{
        'date': str(datetime.datetime.now()),
        'contents': nba_hash
    }





nba_scraper()



