//Setting up jquery auto complete for squadMembr# fields based on Equipped list in json file.
$.getJSON('AcctData/sert.json', function(jsonfile) {
    var namelist = [];
    //check for datafile
    if (jsonfile == null) {
        console.log('nodatafile');
    } else {
        for (var key in jsonfile.data) {
            //check for unique entries
            if ($.inArray(jsonfile.data[key].Equipped, namelist) === -1) {
                namelist.push(jsonfile.data[key].Equipped);
            }
        }
    }
    //Apply autocomplete list to input fields, 0 to 4
    $('[id^=membrName').autocomplete( {
        source: namelist
    });
});

//function for grabbing correct mod data from JSON file with search field input.  RIGHT NOW - it's only for the first slot.
$('#membrName0').on('autocompletechange', function() {
    var namesearch = this.value;
    console.log(namesearch); //finaly got the right valu
    
    $.getJSON('AcctData/sert.json', function(jsonfile) {
        var modArray = [];
        //check for datafile, and push data into array
        if (jsonfile == null) {
            console.log('nodatafile');
        } else {
            //search JSON for namesearch, value seleceted in quicksearch, and get an array of mods that are Equipped by namesearch.
            for (var key in jsonfile.data) {
                modArray = $.grep(jsonfile.data, function(item) {
                    return(item.Equipped == namesearch);
                });
            }
        }
        console.log(modArray);
    });
});
