import requests
import random
import time
from bs4 import BeautifulSoup
#.text for element text
#.replace('x','y') to replace a character
#statmod-stats-1 class for primary
#statmod-stats-2 class for secondary
#statmod-stat-value = number
#statmod-stat-label = label

#optimally pulls the guild info from an input field on the page to insert into string
gldurl = "https://swgoh.gg/g/1705/shatterpolnt/"

#fetching html from swgoh.gg
gldfetch = requests.get(gldurl)
#converts content with BeautifulSoup
gldcontent = BeautifulSoup(gldfetch.content)

#setting the random.seed based on system time
random.seed(None, 100)
#hold off on next fetch
pause = random.uniform(20,70)
time.sleep(pause)
# Array for player urls
plyrAry = []
# Pulling all of their names from the guild url
for rows in gldcontent.find_all('tr'):
    for key in rows.find_all('a'):
            plyrAry.append(key.get('href'))

#Pagenation loop should start here, and will be based on the player array
for player in plyrAry:
    plyrurl = "https://swgoh.gg" + player + "mods/"
    print(plyrurl + 'FirstRun')
    #Start of export string
    modjson = "{\"data\":["
    #Counter for pagenation, and starts at 2 for 2nd mods screen.
    pgcnt=2
    while True:
        #fetching html from swgoh
        r = requests.get(plyrurl)
        #converts content with BeautifulSoup, unknown if it's needed but it looks pretty and lets me use soup!
        soup = BeautifulSoup(r.content)
        #collects all mod primary data
        mods1 = soup.find_all("div",{"class": "statmod-stats-1"})
        #collects all mod secondary data
        mods2 = soup.find_all("div",{"class": "statmod-stats-2"})
        #find both the character the mod is assigned to, odd array variables, and the type of mod it is, even array variables. Maybe find values in the mod that match the various types?
        names = []
        for img in soup.find_all('img', alt=True):
            names.append(str(img['alt']))
        #Mods per page with correlated information, check image type for correlation
        #append values to string, older versions of python recommend arrays and then joining but it's obsolete now.
        #Mod Counter
        i=0
        #even odd counter for equipped [char name], [Mod Slot, and type]
        nmcnt=0
        for item in mods1:
            j=0
            #Setting the Equipped by Character
            modjson += "{\"Equipped\":\"" + names[nmcnt].replace('"','\\\"') + "\","
            #Increment counter to find type of mod, need to find Slot and Set in same array value
            nmcnt += 1
            if 'Receiver' in names[nmcnt]:
                modjson += "\"Slot\":\"Arrow\","    
            if 'Holo-Array' in names[nmcnt]:
                modjson += "\"Slot\":\"Triangle\","
            if 'Multiplexer' in names[nmcnt]:
                modjson += "\"Slot\":\"Cross\","
            if 'Transmitter' in names[nmcnt]:
                modjson += "\"Slot\":\"Square\","
            if 'Processor' in names[nmcnt]:
                modjson += "\"Slot\":\"Diamond\","
            if 'Data-Bus' in names[nmcnt]:
                modjson += "\"Slot\":\"Circle\","
            #Finding the set, the title contains a text identifier valid entries are below
            if 'Health' in names[nmcnt]:
                modjson += "\"Set\":\"Health\","
            if 'Defense' in names[nmcnt]:
                modjson += "\"Set\":\"Defense\","
            if 'Speed' in names[nmcnt]:
                modjson += "\"Set\":\"Speed\","
            if 'Crit Chance' in names[nmcnt]:
                modjson += "\"Set\":\"Critical Chance\","
            if 'Crit Damage' in names[nmcnt]:
                modjson += "\"Set\":\"Critical Damage\","
            if 'Tenacity' in names[nmcnt]:
                modjson += "\"Set\":\"Tenacity\","
            if 'Offense' in names[nmcnt]:
                modjson += "\"Set\":\"Offense\","
            if 'Potency' in names[nmcnt]:
                modjson += "\"Set\":\"Potency\","
            #Increment again to get ready for next mods Equipped Character name.
            nmcnt += 1
            #Primary stat on mod
            modjson += "\"Primary\":\"" + item.find_all("span", {"class": "statmod-stat-label"})[0].text + "\","
            #Setting Secondary stats, this will fail if the mod doesn't have 4 2ndary stats, needs a check added.
            while (j < 4):
                try:
                    label = str(mods2[i].find_all("span", {"class": "statmod-stat-label"})[j].text)
                    value = str(mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text)
                    if label == "Speed":
                        modjson += "\"Spd\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
                    elif label == "Critical Chance" and value.endswith("%"):
                        modjson += "\"Crit%\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
                    elif label == "Offense" and value.endswith("%"):
                        modjson += "\"Off%\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
                    elif label == "Offense":
                        modjson += "\"Off\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
                    elif label == "Protection" and value.endswith("%"):
                        modjson += "\"Prot%\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
                    elif label == "Protection":
                        modjson += "\"Prot\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
                    elif label == "Health" and value.endswith("%"):
                        modjson += "\"HP%\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
                    elif label == "Health":
                        modjson += "\"HP\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
                    elif label == "Defense" and value.endswith("%"):
                        modjson += "\"Def%\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
                    elif label == "Defense":
                        modjson += "\"Def\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
                    elif label == "Potency" and value.endswith("%"):
                        modjson += "\"Pot%\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
                    elif label == "Tenacity" and value.endswith("%"):
                        modjson += "\"Ten%\":" + mods2[i].find_all("span", {"class": "statmod-stat-value"})[j].text.replace('+', '').replace('%', '') + ","
                except:
                    pass
                j += 1
            #Add final Assigned field
            modjson += "\"Assigned\": \"\""
            modjson += "},"    
            i += 1
        #Tries to find the next page, it should reset the url to the next page and we begin the process over again, probably will exit an infinite loop at last page(exception), since I can't think of an easy way to predetermine a user's number of pages.
        #Although the number is in the "class=pagination" div page = soup.find_all("ul", {"class": "pagination"})
        try: 
            nxt = soup.find_all("a", {"aria-label": "Next"})[0].text
            pause = random.uniform(23,70)
            time.sleep(pause)
            plyrurl = 'https://swgoh.gg'+player+'mods/?page=' + str(pgcnt)
            print(plyrurl)
            pgcnt += 1
        except: 
            print("NextPlayer")
            #clean up final comma
            modjson = modjson[:-1]
            modjson += "]}"
            jsonf = open("../AcctData"+player[2:-1].replace('%20', '_')+".json","w")
            jsonf.write(modjson)
            jsonf.close()
            break
exit()