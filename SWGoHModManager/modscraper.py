import requests
from bs4 import BeautifulSoup

url = "https://swgoh.gg/u/sert/mods/"
r = requests.get(url)

soup = BeautifulSoup(r.content)

mods1 = soup.find_all("div",{"class": "statmod-stats-1"})
mods2 = soup.find_all("div",{"class": "statmod-stats-2"})

print(mods[0].find_all("span", {"class": "statmod-stat-label"})[0].text)

for item in mods:
    print(item)

for item in mods:
    print(item.find_all("span", {"class": "statmod-stat-label"})[0].text)
    print(item.find_all("span", {"class": "statmod-stat-value"})[0].text)
    print(item.find_all("span", {"class": "statmod-stat-label"})[1].text)
    print(item.find_all("span", {"class": "statmod-stat-value"})[1].text)
    print(item.find_all("span", {"class": "statmod-stat-label"})[2].text)
    print(item.find_all("span", {"class": "statmod-stat-value"})[2].text)
    print(item.find_all("span", {"class": "statmod-stat-label"})[3].text)
    print(item.find_all("span", {"class": "statmod-stat-value"})[3].text)

for item in mods:
    print(item.contents[1].text)


#statmod-stats-1 class for primary
#statmod-stats-2 class for secondary
#statmod-stat-value = number
#statmod-stat-label = label

#first loop goes through both 1 and 2, 2 is x4 of 1
#2nd item in array is string to compare with json values for placement