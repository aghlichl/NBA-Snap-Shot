import requests
from bs4 import BeautifulSoup

url = 'https://www.basketball-reference.com/leagues/NBA_2021_per_game.html'
stats2021 = requests.get(url)
stats2021
nba_hash = dict()
headers = ["Name", "Pos", "Age", "Tm", "G", "GS", "MP", "FG", "FGA", "FG%", "3P", "3PA", "3P%", "2P", "2PA", "2P%", "eFG%", "FT", "FTA", "FT%", "ORB", "DRB", "TRB", "AST", "STL", "BLK", "TOV", "PF", "PTS"]
soup = BeautifulSoup(stats2021.content, 'lxml')
player_stats = soup.find_all('td')
for i in range(len(player_stats)):
    if i % 29 == 0: 
        nba_hash[(player_stats[i].text)] = {}
    else:    
        nba_hash[(player_stats[(i-(i % 29))].text)][headers[(i % 29)]] = (player_stats[i].text)





