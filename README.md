Since there isn't a good way to collect data from SWGoH for mods I decided I'd make one. Using python3 and BeautifulSoup4 modscraper3.py will pull together an accounts mod data to import through json to Datatables, a jquery plug-in. Which will display it in a table with multi sort for columns and search options.

Now that the data acquisition is complete I need to finish a front end, or app, for account login and storing mod data so it doesn't need to be updated until requested. Probably storing the json in a table and using the same account name that's listed on swgoh, or requiring it, to pull into the scrape script.

Right now the data scraper will run ~once a week for all DL guilds on a seperate evening.

Known bugs:
    * redraw of dataTables resets scroll position, and will need to be persistant
    * Replace '%20' with '' in scraper

Things to finish:
    * Add ability to save modifications, since updates will be weekly, possibly a way to assign mods to another character.
    * Clear button for each assignment table
    * Add a collapse option to hide the table information, hide thead and tbody
    * Create a totals row for each table, to be displayed even when the table collapses, add in tfoot
    * Incorporate max gear stats for each character, to add in another row for total calculation, based on assigned auto complete value