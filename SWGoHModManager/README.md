Known bugs:

    * if a screen scrape is done on a mod with <4 secondary stats it will break the scrape
    * redraw function doesn't remove previous cell values if the new name doesn't have a full set of 6 mods.
    * autocomplete throws the name at the bottom of the page for some reason

Things to finish:
    * Drag / drop for dataTable rows to the lower tables, make sure the color change occures on drop. Will also need to check which slot the dragged row is for.
    * Check for existing json file and run python script if missing.
    * Recreate option to refresh mod data for existing json.
