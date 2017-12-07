//$document ready function
var sqdtbls = [];
//Creates an array of tables to allow users to drag mods from the top table to the lower in order to customize sets. When it's assigned to a lower table it should color the associated row in the top.
var nameselect = [];
//Creates an array of inputs elements to use just above the tables. These are to get an input that will search the data and populate the associated table with the correct mods for the character name selected.

for (var i = 0; i<5; i++){
    nameselect.push(document.createElement('input'));
    $(nameselect[i]).attr({
        'id': 'membrName'+i,
        'type': 'text'
    });
    sqdtbls.push(document.createElement('table'));
    $(sqdtbls[i]).attr({
        'id': 'modSet'+i,
        'class': 'display assigned',
        'width': '100%'
    });
    sqdtbls[i].createTHead();
    sqdtbls[i].lastChild.innerHTML = '<tr><th width=\'90px\'>Equipped</th><th>Slot</th><th width=\'40px\'>Set</th><th>Primary<th><th>Spd</th><th>Crit%</th><th>Off</th><th>Off%</th><th>Prot</th><th>Prot%</th><th>HP</th><th>HP%</th><th>Def</th><th>Def%</th><th>Pot%</th><th>Ten%</th></tr>';
    sqdtbls[i].createTBody();
    r=0
    while (r < 6) {
        for (var j = 0; j < 16; j++) {
            var trow = document.createElement('tr');
            if (i == 0 ) {
                trow.setAttribute('id', 'Square');
            } else if (i == 1) {
                trow.setAttribute('id', 'Arrow');
            } else if (i == 2) {
                trow.setAttribute('id', 'Diamond');
            } else if (i == 3) {
                trow.setAttribute('id', 'Triangle');
            } else if (i == 4) {
                trow.setAttribute('id', 'Circle');
            } else if (i == 5) {
                trow.setAttribute('id', 'Cross');
            }
            var tcell = document.createElement('td');
            if (j == 0) {
                tcell.setAttribute('id', 'Equipped');
            } else if (j == 1) {
                tcell.setAttribute('id', 'Slot');
            } else if (j == 1) {
                tcell.setAttribute('id', 'Set');
            } else if (j == 1) {
                tcell.setAttribute('id', 'Primary');
            } else if (j == 1) {
                tcell.setAttribute('id', 'Spd');
            } else if (j == 1) {
                tcell.setAttribute('id', 'Crit%');
            } else if (j == 1) {
                tcell.setAttribute('id', 'Off');
            } else if (j == 1) {
                tcell.setAttribute('id', 'Off%');
            } else if (j == 1) {
                tcell.setAttribute('id', 'Prot');
            } else if (j == 1) {
                tcell.setAttribute('id', 'Prot%');
            } else if (j == 1) {
                tcell.setAttribute('id', 'HP');
            } else if (j == 1) {
                tcell.setAttribute('id', 'HP%');
            } else if (j == 1) {
                tcell.setAttribute('id', 'Def');
            } else if (j == 1) {
                tcell.setAttribute('id', 'Def%');
            } else if (j == 1) {
                tcell.setAttribute('id', 'Pot%');
            } else if (j == 1) {
                tcell.setAttribute('id', 'Ten%');
            }
            trow.appendChild(tcell);
            r++;
        }
        sqdtbls[i].appendChild(trow);
    }

    document.getElementById('squadMembr'+i).appendChild(nameselect[i]);
    document.getElementById('squadMembr'+i).appendChild(sqdtbls[i]);
}

//trying to figureout redrawing the dom based on the data from autocomplete's json qrep



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


