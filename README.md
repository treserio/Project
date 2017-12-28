Since there isn't a good way to collect data from SWGoH for mods I decided I'd make one. Using python3 and BeautifulSoup4 modscraper3.py will pull together an accounts mod data to import through json to Datatables, a jquery plug-in. Which will display it in a table with multi sort for columns and search options.

Now that the data acquisition is complete I need to finish a front end, or app, for account login and storing mod data so it doesn't need to be updated until requested. Probably storing the json in a table and using the same account name that's listed on swgoh, or requiring it, to pull into the scrape script.

Known bugs:
    * Make submit default action for enter
    * redraw function doesn't remove previous cell values if the new name doesn't have a full set of 6 mods.
        Nore does it remove the values from another table...probably fine for checking out multiple configurations on the same character!

Things to finish:
    * Check for existing json file and run python script if missing.
    * Recreate option to refresh mod data for existing json.
