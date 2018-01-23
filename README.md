Since there isn't a good way to collect data from SWGoH for mods I decided I'd make one. Using python3 and BeautifulSoup4 gldscraper.py will use a guilds url from swgoh.gg to locate all of the players listed and proceed to go through each ones mod page to collect their mod data, and write it to seperate json files. From there the site will accept a players swgoh.gg account name to locate their data and import it to Datatables, a jquery plug-in. Which will display it in a table with multi search and sort options.

Known bugs:\n

Things to finish:
    * Add ability to save modifications, since updates will be weekly, possibly a way to assign mods to another character.

    * Incorporate max gear stats for each character, to add in another row for total calculation, based on assigned auto complete value

    * Add primary stats values to mods