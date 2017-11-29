import requests
from bs4 import BeautifulSoup

url = "https://swgoh.gg/u/sert/mods/"
url_page_2 = "https://swgoh.gg/u/sert/mods/?page=2"

r = requests.get(url)

soup = BeautifulSoup(r.content)

mods1 = soup.find_all("div",{"class": "statmod-stats-1"})
mods2 = soup.find_all("div",{"class": "statmod-stats-2"})

#prints 2ndary mod values in order
for item in mods2:
    print(item.find_all("span", {"class": "statmod-stat-label"})[0].text)
    print(item.find_all("span", {"class": "statmod-stat-value"})[0].text)
    print(item.find_all("span", {"class": "statmod-stat-label"})[1].text)
    print(item.find_all("span", {"class": "statmod-stat-value"})[1].text)
    print(item.find_all("span", {"class": "statmod-stat-label"})[2].text)
    print(item.find_all("span", {"class": "statmod-stat-value"})[2].text)
    print(item.find_all("span", {"class": "statmod-stat-label"})[3].text)
    print(item.find_all("span", {"class": "statmod-stat-value"})[3].text)

#Mods per page with correlated information, only thing missing is the shape of the mod and type.../sigh check image type for correlation, learn to if/then in the loop for python.../cry
i=0
for item in mods1:
    print(item.find_all("span", {"class": "statmod-stat-label"})[0].text)
    print(item.find_all("span", {"class": "statmod-stat-value"})[0].text)
    print(mods2[i].find_all("span", {"class": "statmod-stat-label"})[0].text)
    print(mods2[i].find_all("span", {"class": "statmod-stat-value"})[0].text)
    print(mods2[i].find_all("span", {"class": "statmod-stat-label"})[1].text)
    print(mods2[i].find_all("span", {"class": "statmod-stat-value"})[1].text)
    print(mods2[i].find_all("span", {"class": "statmod-stat-label"})[2].text)
    print(mods2[i].find_all("span", {"class": "statmod-stat-value"})[2].text)
    print(mods2[i].find_all("span", {"class": "statmod-stat-label"})[3].text)
    print(mods2[i].find_all("span", {"class": "statmod-stat-value"})[3].text)
    i+=1
    print("")

#.text for text, and .replace('x','y') to replace a character
#statmod-stats-1 class for primary
#statmod-stats-2 class for secondary
#statmod-stat-value = number
#statmod-stat-label = label

#first loop goes through both 1 and 2, 2 is x4 of 1
#statmod-stat-label in array is string to compare with json values for placement
#append values to array? one for values one for labels?
#save printed info into variables, append to arrays preferrably

#for pagenation
#if ("a", {"aria-label":"next"}) = true
#    url_page_i = "https://swgoh.gg/u/sert/mods/?page=i"
#else end

N=16
nxt = soup.find_all("a", {"aria-label": "Next"})[0].text
#If the above is not None...it errors trying to set it if it's none, need a way to find it before hand.
#find beautiful soup to check if an element tag exists
if nxt is not None:
    url = url + '?page=' + str(N)
    print(url + '   ' + str(N))
    N += 1

if soup.hasattr(("aria-label")):
    print(soup.find_all("a", {"aria-label": "Next"}))


print(soup.find_all("a", {"aria-label": "Next"}))

page = soup.find_all("ul", {"class": "pagination"})
