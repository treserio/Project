import requests
from bs4 import BeautifulSoup

url = "https://swgoh.gg/u/sert/mods/"

r = requests.get(url)

soup = BeautifulSoup(r.content)

mods1 = soup.find_all("div",{"class": "statmod-stats-1"})
mods2 = soup.find_all("div",{"class": "statmod-stats-2"})

#.text for text
#.replace('x','y') to replace a character
#statmod-stats-1 class for primary
#statmod-stats-2 class for secondary
#statmod-stat-value = number
#statmod-stat-label = label

#Mods per page with correlated information, only thing missing is the shape of the mod and type.../sigh check image type for correlation, learn to if/then in the loop for python.../cry
i=0
for item in mods1:
    print("\"" + item.find_all("span", {"class": "statmod-stat-label"})[0].text + "\": " + item.find_all("span", {"class": "statmod-stat-value"})[0].text)
    print(item.find_all("span", {"class": "statmod-stat-value"})[0].text)
    print(mods2[i].find_all("span", {"class": "statmod-stat-label"})[0].text)
    print(mods2[i].find_all("span", {"class": "statmod-stat-value"})[0].text)
    print(mods2[i].find_all("span", {"class": "statmod-stat-label"})[1].text)
    print(mods2[i].find_all("span", {"class": "statmod-stat-value"})[1].text)
    print(mods2[i].find_all("span", {"class": "statmod-stat-label"})[2].text)
    print(mods2[i].find_all("span", {"class": "statmod-stat-value"})[2].text)
    print(mods2[i].find_all("span", {"class": "statmod-stat-label"})[3].text)
    print(mods2[i].find_all("span", {"class": "statmod-stat-value"})[3].text)
    i += 1
    print("")


#statmod-stat-label in array is string to compare with json values for placement
#save printed info into variables, append to arrays preferrably

#Tries to find the next page, it should reset the url to the next page and we begin the process over again, probably will exit an infinite loop at last page(exception), since I can't think of an easy way to predetermine a user's number of pages.
#Although the number is in the "class=pagination" div page = soup.find_all("ul", {"class": "pagination"})

#N must be defined, starts at 2 for 2nd page
N=2
try: 
    nxt = soup.find_all("a", {"aria-label": "Next"})[0].text
    url = url + '?page=' + str(N)
    print(url)
    N += 1
except: #Needs to end infinite loop
    print("noNext")



    
    

