import requests
from bs4 import BeautifulSoup
#.text for element text
#.replace('x','y') to replace a character
#statmod-stats-1 class for primary
#statmod-stats-2 class for secondary
#statmod-stat-value = number
#statmod-stat-label = label

#optimally pulls the username from an input field on the page to insert into string
url = "https://swgoh.gg/u/sert/mods/"
#fetching html from swgoh
r = requests.get(url)
#converts content with BeautifulSoup, unknown if it's needed but it looks pretty and lets me use soup!
soup = BeautifulSoup(r.content)

#collects all mod primary data
mods1 = soup.find_all("div",{"class": "statmod-stats-1"})
#collects all mod secondary data
mods2 = soup.find_all("div",{"class": "statmod-stats-2"})

#Start of export string
modjson = "{\"data\":["

#find both the character the mod is assigned to, odd array variables, and the type of mod it is, even array variables. Maybe find values in the mod that match the various types?
n=0 #n counter
names = []
for img in soup.find_all('img', alt=True):
    names.append(str(img['alt']))
if 'Health' in names[n]:
    print("Health")







#Mods per page with correlated information, only thing missing is the shape of the mod and type.../sigh check image type for correlation
#statmod-stat-label in array is string to compare with json values for placement
#append values to string, older versions of python recommend arrays and then joining but it's obsolete now.
i=0
for item in mods1:
    j=0
    #Equipped By
    modjson += "{\"Equipped\":\"" + names[n] + "\","
    #Add to counter to find type of mod, need to find Slot and Set in same array value
    n+=1
    if 'Health' in names[n]:
        modjson += "\"Set\":\"Health\","
    n+=1
    modjson += "\"Primary\":\"" + item.find_all("span", {"class": "statmod-stat-label"})[0].text + "\","
    while (j < 4):
        label = str(mods2[i].find_all("span", {"class": "statmod-stat-label"})[j].text)
        value = str(mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text)
        if label == "Speed":
            modjson += "\"Spd\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
        elif label == "Critical Chance" and value.endswith("%"):
            modjson += "\"Crit_%\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
        elif label == "Offense" and value.endswith("%"):
            modjson += "\"Off_%\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
        elif label == "Offense":
            modjson += "\"Off\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
        elif label == "Protection" and value.endswith("%"):
            modjson += "\"Prot_%\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
        elif label == "Protection":
            modjson += "\"Prot\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
        elif label == "Health" and value.endswith("%"):
            modjson += "\"HP_%\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
        elif label == "Health":
            modjson += "\"HP\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
        elif label == "Defense" and value.endswith("%"):
            modjson += "\"Def_%\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
        elif label == "Defense":
            modjson += "\"Def\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
        elif label == "Potency" and value.endswith("%"):
            modjson += "\"Pot_%\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
        elif label == "Tenacity" and value.endswith("%"):
            modjson += "\"Ten_%\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
        j += 1
    modjson += "},"    
    i += 1

modjson = modjson[:-1]
print(modjson)
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
    
    

