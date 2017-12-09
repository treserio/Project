//$document ready function...now that I've written all of this I find myself wondering why I didn't just use datatables to do it to begin with...dragable droppable? Now that I've written all of this I'm going to switch to DataTables.../sigh.
var sqdtbls = [];
//Creates an array of tables to allow users to drag mods from the top table to the lower in order to customize sets. When it's assigned to a lower table it should color the associated row in the top.
var nameselect = [];
//Creates an array of inputs elements to use just above the tables. These are to get an input that will search the data and populate the associated table with the correct mods for the character name selected.

// i counter for 5 tables, j counter for 6 rows + headers, k counter for 16 cells in each row
for (var i = 0; i<5; i++) {
    nameselect.push(document.createElement('input'));
    $(nameselect[i]).attr({
        'id': 'membrName'+i,
        'type': 'text'
    });
    sqdtbls.push(document.createElement('table'));
    $(sqdtbls[i]).attr({
        'id': 'modSet'+i,
        'class': 'display assigned',
        'width': '1250px'
    });
    sqdtbls[i].appendChild(document.createElement('colgroup'));
    sqdtbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Equipped');
    sqdtbls[i].lastChild.lastChild.setAttribute('width', '90px');
    sqdtbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Slot');
    sqdtbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Set');
    sqdtbls[i].lastChild.lastChild.setAttribute('width', '40px');
    sqdtbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Primary');
    sqdtbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Spd');
    sqdtbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Crit%');
    sqdtbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Off');
    sqdtbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Off%');
    sqdtbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Prot');
    sqdtbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Prot%');
    sqdtbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'HP');
    sqdtbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'HP%');
    sqdtbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Def');
    sqdtbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Def%');
    sqdtbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Pot%');
    sqdtbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Ten%');

    // Create Header for First Row
    sqdtbls[i].createTHead();
    sqdtbls[i].tHead.insertRow();
    sqdtbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Equipped';
    sqdtbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Slot';
    sqdtbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Set';
    sqdtbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Primary';
    sqdtbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Spd';
    sqdtbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Crit%';
    sqdtbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Off';
    sqdtbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Off%';
    sqdtbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Prot';
    sqdtbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Prot%';
    sqdtbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'HP';
    sqdtbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'HP%';
    sqdtbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Def';
    sqdtbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Def%';
    sqdtbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Pot%';
    sqdtbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Ten%';
    
    // Create tbody to add contents to
    sqdtbls[i].createTBody();
    // loop through adding rows and cells
    for (var j = 0; j < 6; j++) {
        //finish up the rows outside of the header
        sqdtbls[i].tBodies[0].insertRow(j);
        for (var k = 0; k < 16; k++) {
            sqdtbls[i].tBodies[0].rows[j].insertCell();
        }
    }
    // Draw the elements in the DOM
    document.getElementById('squadMembr'+i).appendChild(nameselect[i]);
    document.getElementById('squadMembr'+i).appendChild(sqdtbls[i]);
}

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

//function for grabbing correct mod data from JSON file with search field input.
$('[id^=membrName').on('autocompleteclose', function() {
    var namesearch = this.value;
    var id = this.id;
    
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
        // Run function to redraw table with correct mods found in Array and apply to correct table by id
        redraw(modArray, id);
    });
});

//trying to figure out redrawing the dom based on the array data from autocomplete's json qrep
redraw = function ( array, id ) {
    tbl = id.slice(-1);

    for (var i = 0; i < array.length; i++) {
        if (array[i].Slot == "Square") {
            sqdtbls[tbl].tBodies[0].rows[0].cells[0].innerHTML = array[i].Equipped;
            sqdtbls[tbl].tBodies[0].rows[0].cells[1].innerHTML = array[i].Slot;
            sqdtbls[tbl].tBodies[0].rows[0].cells[2].innerHTML = array[i].Set;
            sqdtbls[tbl].tBodies[0].rows[0].cells[3].innerHTML = array[i].Primary;

            if ( array[i].hasOwnProperty('Spd') ) {
                sqdtbls[tbl].tBodies[0].rows[0].cells[4].innerHTML = array[i]['Spd'];
            } if (array[i].hasOwnProperty('Crit%') ) {
                sqdtbls[tbl].tBodies[0].rows[0].cells[5].innerHTML = array[i]['Crit%'];
            } if (array[i].hasOwnProperty('Off') ) {
                sqdtbls[tbl].tBodies[0].rows[0].cells[6].innerHTML = array[i]['Off'];
            } if (array[i].hasOwnProperty('Off%') ) {
                sqdtbls[tbl].tBodies[0].rows[0].cells[7].innerHTML = array[i]['Off%'];
            } if (array[i].hasOwnProperty('Prot') ) {
                sqdtbls[tbl].tBodies[0].rows[0].cells[8].innerHTML = array[i]['Prot'];
            } if (array[i].hasOwnProperty('Prot%') ) {
                sqdtbls[tbl].tBodies[0].rows[0].cells[9].innerHTML = array[i]['Prot%'];
            } if (array[i].hasOwnProperty('HP') ) {
                sqdtbls[tbl].tBodies[0].rows[0].cells[10].innerHTML = array[i]['HP'];
            } if (array[i].hasOwnProperty('HP%') ) {
                sqdtbls[tbl].tBodies[0].rows[0].cells[11].innerHTML = array[i]['HP%'];
            } if (array[i].hasOwnProperty('Def') ) {
                sqdtbls[tbl].tBodies[0].rows[0].cells[12].innerHTML = array[i]['Def'];
            } if (array[i].hasOwnProperty('Def%') ) {
                sqdtbls[tbl].tBodies[0].rows[0].cells[13].innerHTML = array[i]['Def%'];
            } if (array[i].hasOwnProperty('Pot%') ) {
                sqdtbls[tbl].tBodies[0].rows[0].cells[14].innerHTML = array[i]['Pot%'];
            } if (array[i].hasOwnProperty('Ten%') ) {
                sqdtbls[tbl].tBodies[0].rows[0].cells[15].innerHTML = array[i]['Ten%'];
            }
        } else if (array[i].Slot == "Arrow") {
            sqdtbls[tbl].tBodies[0].rows[1].cells[0].innerHTML = array[i].Equipped;
            sqdtbls[tbl].tBodies[0].rows[1].cells[1].innerHTML = array[i].Slot;
            sqdtbls[tbl].tBodies[0].rows[1].cells[2].innerHTML = array[i].Set;
            sqdtbls[tbl].tBodies[0].rows[1].cells[3].innerHTML = array[i].Primary;

            if ( array[i].hasOwnProperty('Spd') ) {
                sqdtbls[tbl].tBodies[0].rows[1].cells[4].innerHTML = array[i]['Spd'];
            } if (array[i].hasOwnProperty('Crit%') ) {
                sqdtbls[tbl].tBodies[0].rows[1].cells[5].innerHTML = array[i]['Crit%'];
            } if (array[i].hasOwnProperty('Off') ) {
                sqdtbls[tbl].tBodies[0].rows[1].cells[6].innerHTML = array[i]['Off'];
            } if (array[i].hasOwnProperty('Off%') ) {
                sqdtbls[tbl].tBodies[0].rows[1].cells[7].innerHTML = array[i]['Off%'];
            } if (array[i].hasOwnProperty('Prot') ) {
                sqdtbls[tbl].tBodies[0].rows[1].cells[8].innerHTML = array[i]['Prot'];
            } if (array[i].hasOwnProperty('Prot%') ) {
                sqdtbls[tbl].tBodies[0].rows[1].cells[9].innerHTML = array[i]['Prot%'];
            } if (array[i].hasOwnProperty('HP') ) {
                sqdtbls[tbl].tBodies[0].rows[1].cells[10].innerHTML = array[i]['HP'];
            } if (array[i].hasOwnProperty('HP%') ) {
                sqdtbls[tbl].tBodies[0].rows[1].cells[11].innerHTML = array[i]['HP%'];
            } if (array[i].hasOwnProperty('Def') ) {
                sqdtbls[tbl].tBodies[0].rows[1].cells[12].innerHTML = array[i]['Def'];
            } if (array[i].hasOwnProperty('Def%') ) {
                sqdtbls[tbl].tBodies[0].rows[1].cells[13].innerHTML = array[i]['Def%'];
            } if (array[i].hasOwnProperty('Pot%') ) {
                sqdtbls[tbl].tBodies[0].rows[1].cells[14].innerHTML = array[i]['Pot%'];
            } if (array[i].hasOwnProperty('Ten%') ) {
                sqdtbls[tbl].tBodies[0].rows[1].cells[15].innerHTML = array[i]['Ten%'];
            }
        } else if (array[i].Slot == "Diamond") {
            sqdtbls[tbl].tBodies[0].rows[2].cells[0].innerHTML = array[i].Equipped;
            sqdtbls[tbl].tBodies[0].rows[2].cells[1].innerHTML = array[i].Slot;
            sqdtbls[tbl].tBodies[0].rows[2].cells[2].innerHTML = array[i].Set;
            sqdtbls[tbl].tBodies[0].rows[2].cells[3].innerHTML = array[i].Primary;

            if ( array[i].hasOwnProperty('Spd') ) {
                sqdtbls[tbl].tBodies[0].rows[2].cells[4].innerHTML = array[i]['Spd'];
            } if (array[i].hasOwnProperty('Crit%') ) {
                sqdtbls[tbl].tBodies[0].rows[2].cells[5].innerHTML = array[i]['Crit%'];
            } if (array[i].hasOwnProperty('Off') ) {
                sqdtbls[tbl].tBodies[0].rows[2].cells[6].innerHTML = array[i]['Off'];
            } if (array[i].hasOwnProperty('Off%') ) {
                sqdtbls[tbl].tBodies[0].rows[2].cells[7].innerHTML = array[i]['Off%'];
            } if (array[i].hasOwnProperty('Prot') ) {
                sqdtbls[tbl].tBodies[0].rows[2].cells[8].innerHTML = array[i]['Prot'];
            } if (array[i].hasOwnProperty('Prot%') ) {
                sqdtbls[tbl].tBodies[0].rows[2].cells[9].innerHTML = array[i]['Prot%'];
            } if (array[i].hasOwnProperty('HP') ) {
                sqdtbls[tbl].tBodies[0].rows[2].cells[10].innerHTML = array[i]['HP'];
            } if (array[i].hasOwnProperty('HP%') ) {
                sqdtbls[tbl].tBodies[0].rows[2].cells[11].innerHTML = array[i]['HP%'];
            } if (array[i].hasOwnProperty('Def') ) {
                sqdtbls[tbl].tBodies[0].rows[2].cells[12].innerHTML = array[i]['Def'];
            } if (array[i].hasOwnProperty('Def%') ) {
                sqdtbls[tbl].tBodies[0].rows[2].cells[13].innerHTML = array[i]['Def%'];
            } if (array[i].hasOwnProperty('Pot%') ) {
                sqdtbls[tbl].tBodies[0].rows[2].cells[14].innerHTML = array[i]['Pot%'];
            } if (array[i].hasOwnProperty('Ten%') ) {
                sqdtbls[tbl].tBodies[0].rows[2].cells[15].innerHTML = array[i]['Ten%'];
            }
        } else if (array[i].Slot == "Triangle") {
            sqdtbls[tbl].tBodies[0].rows[3].cells[0].innerHTML = array[i].Equipped;
            sqdtbls[tbl].tBodies[0].rows[3].cells[1].innerHTML = array[i].Slot;
            sqdtbls[tbl].tBodies[0].rows[3].cells[2].innerHTML = array[i].Set;
            sqdtbls[tbl].tBodies[0].rows[3].cells[3].innerHTML = array[i].Primary;

            if ( array[i].hasOwnProperty('Spd') ) {
                sqdtbls[tbl].tBodies[0].rows[3].cells[4].innerHTML = array[i]['Spd'];
            } if (array[i].hasOwnProperty('Crit%') ) {
                sqdtbls[tbl].tBodies[0].rows[3].cells[5].innerHTML = array[i]['Crit%'];
            } if (array[i].hasOwnProperty('Off') ) {
                sqdtbls[tbl].tBodies[0].rows[3].cells[6].innerHTML = array[i]['Off'];
            } if (array[i].hasOwnProperty('Off%') ) {
                sqdtbls[tbl].tBodies[0].rows[3].cells[7].innerHTML = array[i]['Off%'];
            } if (array[i].hasOwnProperty('Prot') ) {
                sqdtbls[tbl].tBodies[0].rows[3].cells[8].innerHTML = array[i]['Prot'];
            } if (array[i].hasOwnProperty('Prot%') ) {
                sqdtbls[tbl].tBodies[0].rows[3].cells[9].innerHTML = array[i]['Prot%'];
            } if (array[i].hasOwnProperty('HP') ) {
                sqdtbls[tbl].tBodies[0].rows[3].cells[10].innerHTML = array[i]['HP'];
            } if (array[i].hasOwnProperty('HP%') ) {
                sqdtbls[tbl].tBodies[0].rows[3].cells[11].innerHTML = array[i]['HP%'];
            } if (array[i].hasOwnProperty('Def') ) {
                sqdtbls[tbl].tBodies[0].rows[3].cells[12].innerHTML = array[i]['Def'];
            } if (array[i].hasOwnProperty('Def%') ) {
                sqdtbls[tbl].tBodies[0].rows[3].cells[13].innerHTML = array[i]['Def%'];
            } if (array[i].hasOwnProperty('Pot%') ) {
                sqdtbls[tbl].tBodies[0].rows[3].cells[14].innerHTML = array[i]['Pot%'];
            } if (array[i].hasOwnProperty('Ten%') ) {
                sqdtbls[tbl].tBodies[0].rows[3].cells[15].innerHTML = array[i]['Ten%'];
            }
        } else if (array[i].Slot == "Circle") {
            sqdtbls[tbl].tBodies[0].rows[4].cells[0].innerHTML = array[i].Equipped;
            sqdtbls[tbl].tBodies[0].rows[4].cells[1].innerHTML = array[i].Slot;
            sqdtbls[tbl].tBodies[0].rows[4].cells[2].innerHTML = array[i].Set;
            sqdtbls[tbl].tBodies[0].rows[4].cells[3].innerHTML = array[i].Primary;

            if ( array[i].hasOwnProperty('Spd') ) {
                sqdtbls[tbl].tBodies[0].rows[4].cells[4].innerHTML = array[i]['Spd'];
            } if (array[i].hasOwnProperty('Crit%') ) {
                sqdtbls[tbl].tBodies[0].rows[4].cells[5].innerHTML = array[i]['Crit%'];
            } if (array[i].hasOwnProperty('Off') ) {
                sqdtbls[tbl].tBodies[0].rows[4].cells[6].innerHTML = array[i]['Off'];
            } if (array[i].hasOwnProperty('Off%') ) {
                sqdtbls[tbl].tBodies[0].rows[4].cells[7].innerHTML = array[i]['Off%'];
            } if (array[i].hasOwnProperty('Prot') ) {
                sqdtbls[tbl].tBodies[0].rows[4].cells[8].innerHTML = array[i]['Prot'];
            } if (array[i].hasOwnProperty('Prot%') ) {
                sqdtbls[tbl].tBodies[0].rows[4].cells[9].innerHTML = array[i]['Prot%'];
            } if (array[i].hasOwnProperty('HP') ) {
                sqdtbls[tbl].tBodies[0].rows[4].cells[10].innerHTML = array[i]['HP'];
            } if (array[i].hasOwnProperty('HP%') ) {
                sqdtbls[tbl].tBodies[0].rows[4].cells[11].innerHTML = array[i]['HP%'];
            } if (array[i].hasOwnProperty('Def') ) {
                sqdtbls[tbl].tBodies[0].rows[4].cells[12].innerHTML = array[i]['Def'];
            } if (array[i].hasOwnProperty('Def%') ) {
                sqdtbls[tbl].tBodies[0].rows[4].cells[13].innerHTML = array[i]['Def%'];
            } if (array[i].hasOwnProperty('Pot%') ) {
                sqdtbls[tbl].tBodies[0].rows[4].cells[14].innerHTML = array[i]['Pot%'];
            } if (array[i].hasOwnProperty('Ten%') ) {
                sqdtbls[tbl].tBodies[0].rows[4].cells[15].innerHTML = array[i]['Ten%'];
            }
        } else if (array[i].Slot == "Cross") {
            sqdtbls[tbl].tBodies[0].rows[5].cells[0].innerHTML = array[i].Equipped;
            sqdtbls[tbl].tBodies[0].rows[5].cells[1].innerHTML = array[i].Slot;
            sqdtbls[tbl].tBodies[0].rows[5].cells[2].innerHTML = array[i].Set;
            sqdtbls[tbl].tBodies[0].rows[5].cells[3].innerHTML = array[i].Primary;

            if ( array[i].hasOwnProperty('Spd') ) {
                sqdtbls[tbl].tBodies[0].rows[5].cells[4].innerHTML = array[i]['Spd'];
            } if (array[i].hasOwnProperty('Crit%') ) {
                sqdtbls[tbl].tBodies[0].rows[5].cells[5].innerHTML = array[i]['Crit%'];
            } if (array[i].hasOwnProperty('Off') ) {
                sqdtbls[tbl].tBodies[0].rows[5].cells[6].innerHTML = array[i]['Off'];
            } if (array[i].hasOwnProperty('Off%') ) {
                sqdtbls[tbl].tBodies[0].rows[5].cells[7].innerHTML = array[i]['Off%'];
            } if (array[i].hasOwnProperty('Prot') ) {
                sqdtbls[tbl].tBodies[0].rows[5].cells[8].innerHTML = array[i]['Prot'];
            } if (array[i].hasOwnProperty('Prot%') ) {
                sqdtbls[tbl].tBodies[0].rows[5].cells[9].innerHTML = array[i]['Prot%'];
            } if (array[i].hasOwnProperty('HP') ) {
                sqdtbls[tbl].tBodies[0].rows[5].cells[10].innerHTML = array[i]['HP'];
            } if (array[i].hasOwnProperty('HP%') ) {
                sqdtbls[tbl].tBodies[0].rows[5].cells[11].innerHTML = array[i]['HP%'];
            } if (array[i].hasOwnProperty('Def') ) {
                sqdtbls[tbl].tBodies[0].rows[5].cells[12].innerHTML = array[i]['Def'];
            } if (array[i].hasOwnProperty('Def%') ) {
                sqdtbls[tbl].tBodies[0].rows[5].cells[13].innerHTML = array[i]['Def%'];
            } if (array[i].hasOwnProperty('Pot%') ) {
                sqdtbls[tbl].tBodies[0].rows[5].cells[14].innerHTML = array[i]['Pot%'];
            } if (array[i].hasOwnProperty('Ten%') ) {
                sqdtbls[tbl].tBodies[0].rows[5].cells[15].innerHTML = array[i]['Ten%'];
            }
        }
    }
}