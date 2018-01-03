//$document ready function...now that I've written all of this I find myself wondering why I didn't just use datatables to do it to begin with...dragable droppable? Now that I've written all of this I'm going to switch to DataTables.../sigh.

//Creates an array of tables to allow users to drag mods from the top table to the lower in order to customize sets. When it's assigned to a lower table it should color the associated row in the top.
var sqdtbls = [];
//Creates an array of inputs elements to use just above the tables. These are to get an input that will search the data and populate the associated table with the correct mods for the character name selected.
var nameselect = [];
// i counter for 5 tables, j counter for 6 rows + headers, k counter for 16 cells in each row
for (var i = 0; i<5; i++) {
    nameselect.push(document.createElement('input'));
    $(nameselect[i]).attr({
        'id': 'membrName'+i,
        'type': 'text',
        'placeholder':'Find Mods Equipped by:'
    });
    sqdtbls.push(document.createElement('table'));
    $(sqdtbls[i]).attr({
        'id': 'modSet'+i,
        'class': 'display assigned',
        'width': '1250px'
    });
    // Create Column settings for tables
    sqdtbls[i].appendChild(document.createElement('colgroup'));
    sqdtbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Equipped');
    sqdtbls[i].lastChild.lastChild.setAttribute('width', '90px');
    sqdtbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Slot');
    sqdtbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Set');
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
    // loop through adding rows to body
    for (var j = 0; j < 6; j++) {
        sqdtbls[i].tBodies[0].insertRow(j);
        // loop through adding cells to rows
        for (var k = 0; k < 16; k++) {
            sqdtbls[i].tBodies[0].rows[j].insertCell();
        }
    }
    // Draw the elements in the DOM
    document.getElementById('squadMembr'+i).appendChild(nameselect[i]);
    document.getElementById('squadMembr'+i).appendChild(sqdtbls[i]);
}

//function for grabbing correct mod data from JSON file with autocomplete field input.
$('[id^=membrName').on('autocompleteclose', function() {
    var namesearch = this.value;
    var id = this.id.slice(-1);
    
    $.getJSON(filelocation, function(jsonfile) {
        var modArray = [];
        //check for datafile, and push data into array
        if (jsonfile == null) {
            console.log('no datafile');
        } else {
            //search JSON for namesearch, value seleceted in autocomplete, and get an array of mods that are Equipped by namesearch.
            for (var key in jsonfile.data) {
                modArray = $.grep(jsonfile.data, function(item) {
                    return(item.Equipped == namesearch);
                });
            }
        }
        // Run function to redraw #assigned table with correct mods found in Array and apply to correct table by id
        AutoCompRedraw(modArray, id);
        // Run function to recolor dataTable rows based on assigned table id
        recolor(namesearch, id);
        // Update dataTable to reflect changes
        $('#moddata').DataTable().draw();
    });
});

//trying to figure out redrawing the dom based on the array data from autocomplete's json qrep
//Needs a way to remove values from cells if the character doesn't have 6 mods equiped
AutoCompRedraw = function ( modArray, id ) {
    var square = 0;
    var arrow = 0;
    var diamond = 0;
    var triangle = 0;
    var circle = 0;
    var cross = 0;

    for (var key in modArray) {
        if (modArray[key].Slot == 'Square') {
            square = 1;
        } else if (modArray[key].Slot == 'Arrow') {
            arrow = 1;
        } else if (modArray[key].Slot == 'Diamond') {
            diamond = 1;
        } else if (modArray[key].Slot == 'Triangle') {
            triangle = 1;
        } else if (modArray[key].Slot == 'Circle') {
            circle = 1;
        } else if (modArray[key].Slot == 'Cross') {
            cross = 1;
        }
    }
    for (var key in modArray) {
        if (modArray[key].Slot == 'Square') {
            sqdtbls[id].tBodies[0].rows[0].cells[0].innerHTML = modArray[key].Equipped;
            sqdtbls[id].tBodies[0].rows[0].cells[1].innerHTML = modArray[key].Slot;
            sqdtbls[id].tBodies[0].rows[0].cells[2].innerHTML = modArray[key].Set;
            sqdtbls[id].tBodies[0].rows[0].cells[3].innerHTML = modArray[key].Primary;

            if ( modArray[key].hasOwnProperty('Spd') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[4].innerHTML = modArray[key]['Spd'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[4].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Crit%') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[5].innerHTML = modArray[key]['Crit%'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[5].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Off') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[6].innerHTML = modArray[key]['Off'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[6].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Off%') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[7].innerHTML = modArray[key]['Off%'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[7].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Prot') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[8].innerHTML = modArray[key]['Prot'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[8].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Prot%') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[9].innerHTML = modArray[key]['Prot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[9].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('HP') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[10].innerHTML = modArray[key]['HP'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[10].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('HP%') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[11].innerHTML = modArray[key]['HP%'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[11].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Def') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[12].innerHTML = modArray[key]['Def'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[12].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Def%') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[13].innerHTML = modArray[key]['Def%'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[13].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Pot%') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[14].innerHTML = modArray[key]['Pot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[14].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Ten%') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[15].innerHTML = modArray[key]['Ten%'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[15].innerHTML = '';
            }
        } else if (modArray[key].Slot == 'Arrow') {
            sqdtbls[id].tBodies[0].rows[1].cells[0].innerHTML = modArray[key].Equipped;
            sqdtbls[id].tBodies[0].rows[1].cells[1].innerHTML = modArray[key].Slot;
            sqdtbls[id].tBodies[0].rows[1].cells[2].innerHTML = modArray[key].Set;
            sqdtbls[id].tBodies[0].rows[1].cells[3].innerHTML = modArray[key].Primary;

            if ( modArray[key].hasOwnProperty('Spd') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[4].innerHTML = modArray[key]['Spd'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[4].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Crit%') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[5].innerHTML = modArray[key]['Crit%'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[5].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Off') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[6].innerHTML = modArray[key]['Off'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[6].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Off%') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[7].innerHTML = modArray[key]['Off%'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[7].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Prot') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[8].innerHTML = modArray[key]['Prot'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[8].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Prot%') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[9].innerHTML = modArray[key]['Prot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[9].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('HP') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[10].innerHTML = modArray[key]['HP'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[10].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('HP%') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[11].innerHTML = modArray[key]['HP%'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[11].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Def') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[12].innerHTML = modArray[key]['Def'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[12].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Def%') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[13].innerHTML = modArray[key]['Def%'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[13].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Pot%') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[14].innerHTML = modArray[key]['Pot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[14].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Ten%') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[15].innerHTML = modArray[key]['Ten%'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[15].innerHTML = '';
            }
        } else if (modArray[key].Slot == 'Diamond') {
            sqdtbls[id].tBodies[0].rows[2].cells[0].innerHTML = modArray[key].Equipped;
            sqdtbls[id].tBodies[0].rows[2].cells[1].innerHTML = modArray[key].Slot;
            sqdtbls[id].tBodies[0].rows[2].cells[2].innerHTML = modArray[key].Set;
            sqdtbls[id].tBodies[0].rows[2].cells[3].innerHTML = modArray[key].Primary;

            if ( modArray[key].hasOwnProperty('Spd') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[4].innerHTML = modArray[key]['Spd'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[4].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Crit%') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[5].innerHTML = modArray[key]['Crit%'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[5].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Off') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[6].innerHTML = modArray[key]['Off'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[6].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Off%') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[7].innerHTML = modArray[key]['Off%'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[7].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Prot') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[8].innerHTML = modArray[key]['Prot'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[8].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Prot%') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[9].innerHTML = modArray[key]['Prot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[9].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('HP') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[10].innerHTML = modArray[key]['HP'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[10].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('HP%') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[11].innerHTML = modArray[key]['HP%'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[11].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Def') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[12].innerHTML = modArray[key]['Def'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[12].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Def%') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[13].innerHTML = modArray[key]['Def%'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[13].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Pot%') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[14].innerHTML = modArray[key]['Pot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[14].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Ten%') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[15].innerHTML = modArray[key]['Ten%'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[15].innerHTML = '';
            }
        } else if (modArray[key].Slot == 'Triangle') {
            sqdtbls[id].tBodies[0].rows[3].cells[0].innerHTML = modArray[key].Equipped;
            sqdtbls[id].tBodies[0].rows[3].cells[1].innerHTML = modArray[key].Slot;
            sqdtbls[id].tBodies[0].rows[3].cells[2].innerHTML = modArray[key].Set;
            sqdtbls[id].tBodies[0].rows[3].cells[3].innerHTML = modArray[key].Primary;

            if ( modArray[key].hasOwnProperty('Spd') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[4].innerHTML = modArray[key]['Spd'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[4].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Crit%') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[5].innerHTML = modArray[key]['Crit%'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[5].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Off') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[6].innerHTML = modArray[key]['Off'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[6].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Off%') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[7].innerHTML = modArray[key]['Off%'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[7].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Prot') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[8].innerHTML = modArray[key]['Prot'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[8].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Prot%') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[9].innerHTML = modArray[key]['Prot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[9].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('HP') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[10].innerHTML = modArray[key]['HP'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[10].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('HP%') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[11].innerHTML = modArray[key]['HP%'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[11].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Def') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[12].innerHTML = modArray[key]['Def'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[12].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Def%') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[13].innerHTML = modArray[key]['Def%'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[13].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Pot%') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[14].innerHTML = modArray[key]['Pot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[14].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Ten%') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[15].innerHTML = modArray[key]['Ten%'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[15].innerHTML = '';
            }
        } else if (modArray[key].Slot == 'Circle') {
            sqdtbls[id].tBodies[0].rows[4].cells[0].innerHTML = modArray[key].Equipped;
            sqdtbls[id].tBodies[0].rows[4].cells[1].innerHTML = modArray[key].Slot;
            sqdtbls[id].tBodies[0].rows[4].cells[2].innerHTML = modArray[key].Set;
            sqdtbls[id].tBodies[0].rows[4].cells[3].innerHTML = modArray[key].Primary;

            if ( modArray[key].hasOwnProperty('Spd') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[4].innerHTML = modArray[key]['Spd'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[4].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Crit%') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[5].innerHTML = modArray[key]['Crit%'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[5].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Off') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[6].innerHTML = modArray[key]['Off'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[6].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Off%') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[7].innerHTML = modArray[key]['Off%'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[7].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Prot') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[8].innerHTML = modArray[key]['Prot'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[8].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Prot%') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[9].innerHTML = modArray[key]['Prot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[9].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('HP') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[10].innerHTML = modArray[key]['HP'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[10].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('HP%') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[11].innerHTML = modArray[key]['HP%'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[11].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Def') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[12].innerHTML = modArray[key]['Def'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[12].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Def%') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[13].innerHTML = modArray[key]['Def%'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[13].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Pot%') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[14].innerHTML = modArray[key]['Pot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[14].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Ten%') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[15].innerHTML = modArray[key]['Ten%'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[15].innerHTML = '';
            }
        } else if (modArray[key].Slot == 'Cross') {
            sqdtbls[id].tBodies[0].rows[5].cells[0].innerHTML = modArray[key].Equipped;
            sqdtbls[id].tBodies[0].rows[5].cells[1].innerHTML = modArray[key].Slot;
            sqdtbls[id].tBodies[0].rows[5].cells[2].innerHTML = modArray[key].Set;
            sqdtbls[id].tBodies[0].rows[5].cells[3].innerHTML = modArray[key].Primary;

            if ( modArray[key].hasOwnProperty('Spd') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[4].innerHTML = modArray[key]['Spd'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[4].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Crit%') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[5].innerHTML = modArray[key]['Crit%'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[5].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Off') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[6].innerHTML = modArray[key]['Off'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[6].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Off%') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[7].innerHTML = modArray[key]['Off%'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[7].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Prot') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[8].innerHTML = modArray[key]['Prot'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[8].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Prot%') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[9].innerHTML = modArray[key]['Prot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[9].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('HP') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[10].innerHTML = modArray[key]['HP'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[10].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('HP%') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[11].innerHTML = modArray[key]['HP%'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[11].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Def') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[12].innerHTML = modArray[key]['Def'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[12].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Def%') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[13].innerHTML = modArray[key]['Def%'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[13].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Pot%') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[14].innerHTML = modArray[key]['Pot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[14].innerHTML = '';
            }
            if (modArray[key].hasOwnProperty('Ten%') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[15].innerHTML = modArray[key]['Ten%'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[15].innerHTML = '';
            }
        }  
    }
    if (square === 0) {
        sqdtbls[id].tBodies[0].rows[0].cells[0].innerHTML = modArray[0].Equipped;
        sqdtbls[id].tBodies[0].rows[0].cells[1].innerHTML = 'Square';
        sqdtbls[id].tBodies[0].rows[0].cells[2].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[0].cells[3].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[0].cells[4].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[0].cells[5].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[0].cells[6].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[0].cells[7].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[0].cells[8].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[0].cells[9].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[0].cells[10].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[0].cells[11].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[0].cells[12].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[0].cells[13].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[0].cells[14].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[0].cells[15].innerHTML = '';
    }
    if (arrow === 0) {
        sqdtbls[id].tBodies[0].rows[1].cells[0].innerHTML = modArray[0].Equipped;
        sqdtbls[id].tBodies[0].rows[1].cells[1].innerHTML = 'Arrow';
        sqdtbls[id].tBodies[0].rows[1].cells[2].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[1].cells[3].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[1].cells[4].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[1].cells[5].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[1].cells[6].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[1].cells[7].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[1].cells[8].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[1].cells[9].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[1].cells[10].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[1].cells[11].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[1].cells[12].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[1].cells[13].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[1].cells[14].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[1].cells[15].innerHTML = '';
    }
    if (diamond === 0) {
        sqdtbls[id].tBodies[0].rows[2].cells[0].innerHTML = modArray[0].Equipped;
        sqdtbls[id].tBodies[0].rows[2].cells[1].innerHTML = 'Diamond';
        sqdtbls[id].tBodies[0].rows[2].cells[2].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[2].cells[3].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[2].cells[4].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[2].cells[5].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[2].cells[6].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[2].cells[7].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[2].cells[8].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[2].cells[9].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[2].cells[10].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[2].cells[11].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[2].cells[12].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[2].cells[13].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[2].cells[14].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[2].cells[15].innerHTML = '';
    }
    if (triangle === 0) {
        sqdtbls[id].tBodies[0].rows[3].cells[0].innerHTML = modArray[0].Equipped;
        sqdtbls[id].tBodies[0].rows[3].cells[1].innerHTML = 'Triangle';
        sqdtbls[id].tBodies[0].rows[3].cells[2].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[3].cells[3].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[3].cells[4].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[3].cells[5].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[3].cells[6].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[3].cells[7].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[3].cells[8].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[3].cells[9].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[3].cells[10].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[3].cells[11].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[3].cells[12].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[3].cells[13].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[3].cells[14].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[3].cells[15].innerHTML = '';
    }
    if (circle === 0) {
        sqdtbls[id].tBodies[0].rows[4].cells[0].innerHTML = modArray[0].Equipped;
        sqdtbls[id].tBodies[0].rows[4].cells[1].innerHTML = 'Circle';
        sqdtbls[id].tBodies[0].rows[4].cells[2].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[4].cells[3].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[4].cells[4].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[4].cells[5].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[4].cells[6].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[4].cells[7].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[4].cells[8].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[4].cells[9].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[4].cells[10].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[4].cells[11].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[4].cells[12].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[4].cells[13].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[4].cells[14].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[4].cells[15].innerHTML = '';
    }
    if (cross === 0) {
        sqdtbls[id].tBodies[0].rows[5].cells[0].innerHTML = modArray[0].Equipped;
        sqdtbls[id].tBodies[0].rows[5].cells[1].innerHTML = 'Cross';
        sqdtbls[id].tBodies[0].rows[5].cells[2].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[5].cells[3].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[5].cells[4].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[5].cells[5].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[5].cells[6].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[5].cells[7].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[5].cells[8].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[5].cells[9].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[5].cells[10].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[5].cells[11].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[5].cells[12].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[5].cells[13].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[5].cells[14].innerHTML = '';
        sqdtbls[id].tBodies[0].rows[5].cells[15].innerHTML = '';
    }        
}

SnglRedraw = function ( modArray, id ) {

    for (var i = 0; i < modArray.length; i++) {
        if (modArray[i].Slot == "Square") {
            sqdtbls[id].tBodies[0].rows[0].cells[0].innerHTML = modArray[i].Equipped;
            sqdtbls[id].tBodies[0].rows[0].cells[1].innerHTML = modArray[i].Slot;
            sqdtbls[id].tBodies[0].rows[0].cells[2].innerHTML = modArray[i].Set;
            sqdtbls[id].tBodies[0].rows[0].cells[3].innerHTML = modArray[i].Primary;

            if ( modArray[i].hasOwnProperty('Spd') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[4].innerHTML = modArray[i]['Spd'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[4].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Crit%') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[5].innerHTML = modArray[i]['Crit%'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[5].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[6].innerHTML = modArray[i]['Off'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[6].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off%') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[7].innerHTML = modArray[i]['Off%'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[7].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[8].innerHTML = modArray[i]['Prot'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[8].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot%') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[9].innerHTML = modArray[i]['Prot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[9].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[10].innerHTML = modArray[i]['HP'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[10].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP%') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[11].innerHTML = modArray[i]['HP%'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[11].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[12].innerHTML = modArray[i]['Def'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[12].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def%') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[13].innerHTML = modArray[i]['Def%'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[13].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Pot%') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[14].innerHTML = modArray[i]['Pot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[14].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Ten%') ) {
                sqdtbls[id].tBodies[0].rows[0].cells[15].innerHTML = modArray[i]['Ten%'];
            } else {
                sqdtbls[id].tBodies[0].rows[0].cells[15].innerHTML = '';
            }
        } else if (modArray[i].Slot == "Arrow") {
            sqdtbls[id].tBodies[0].rows[1].cells[0].innerHTML = modArray[i].Equipped;
            sqdtbls[id].tBodies[0].rows[1].cells[1].innerHTML = modArray[i].Slot;
            sqdtbls[id].tBodies[0].rows[1].cells[2].innerHTML = modArray[i].Set;
            sqdtbls[id].tBodies[0].rows[1].cells[3].innerHTML = modArray[i].Primary;

            if ( modArray[i].hasOwnProperty('Spd') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[4].innerHTML = modArray[i]['Spd'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[4].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Crit%') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[5].innerHTML = modArray[i]['Crit%'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[5].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[6].innerHTML = modArray[i]['Off'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[6].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off%') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[7].innerHTML = modArray[i]['Off%'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[7].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[8].innerHTML = modArray[i]['Prot'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[8].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot%') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[9].innerHTML = modArray[i]['Prot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[9].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[10].innerHTML = modArray[i]['HP'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[10].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP%') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[11].innerHTML = modArray[i]['HP%'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[11].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[12].innerHTML = modArray[i]['Def'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[12].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def%') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[13].innerHTML = modArray[i]['Def%'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[13].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Pot%') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[14].innerHTML = modArray[i]['Pot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[14].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Ten%') ) {
                sqdtbls[id].tBodies[0].rows[1].cells[15].innerHTML = modArray[i]['Ten%'];
            } else {
                sqdtbls[id].tBodies[0].rows[1].cells[15].innerHTML = '';
            }
        } else if (modArray[i].Slot == "Diamond") {
            sqdtbls[id].tBodies[0].rows[2].cells[0].innerHTML = modArray[i].Equipped;
            sqdtbls[id].tBodies[0].rows[2].cells[1].innerHTML = modArray[i].Slot;
            sqdtbls[id].tBodies[0].rows[2].cells[2].innerHTML = modArray[i].Set;
            sqdtbls[id].tBodies[0].rows[2].cells[3].innerHTML = modArray[i].Primary;

            if ( modArray[i].hasOwnProperty('Spd') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[4].innerHTML = modArray[i]['Spd'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[4].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Crit%') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[5].innerHTML = modArray[i]['Crit%'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[5].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[6].innerHTML = modArray[i]['Off'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[6].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off%') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[7].innerHTML = modArray[i]['Off%'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[7].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[8].innerHTML = modArray[i]['Prot'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[8].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot%') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[9].innerHTML = modArray[i]['Prot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[9].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[10].innerHTML = modArray[i]['HP'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[10].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP%') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[11].innerHTML = modArray[i]['HP%'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[11].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[12].innerHTML = modArray[i]['Def'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[12].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def%') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[13].innerHTML = modArray[i]['Def%'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[13].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Pot%') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[14].innerHTML = modArray[i]['Pot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[14].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Ten%') ) {
                sqdtbls[id].tBodies[0].rows[2].cells[15].innerHTML = modArray[i]['Ten%'];
            } else {
                sqdtbls[id].tBodies[0].rows[2].cells[15].innerHTML = '';
            }
        } else if (modArray[i].Slot == "Triangle") {
            sqdtbls[id].tBodies[0].rows[3].cells[0].innerHTML = modArray[i].Equipped;
            sqdtbls[id].tBodies[0].rows[3].cells[1].innerHTML = modArray[i].Slot;
            sqdtbls[id].tBodies[0].rows[3].cells[2].innerHTML = modArray[i].Set;
            sqdtbls[id].tBodies[0].rows[3].cells[3].innerHTML = modArray[i].Primary;

            if ( modArray[i].hasOwnProperty('Spd') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[4].innerHTML = modArray[i]['Spd'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[4].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Crit%') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[5].innerHTML = modArray[i]['Crit%'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[5].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[6].innerHTML = modArray[i]['Off'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[6].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off%') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[7].innerHTML = modArray[i]['Off%'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[7].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[8].innerHTML = modArray[i]['Prot'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[8].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot%') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[9].innerHTML = modArray[i]['Prot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[9].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[10].innerHTML = modArray[i]['HP'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[10].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP%') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[11].innerHTML = modArray[i]['HP%'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[11].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[12].innerHTML = modArray[i]['Def'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[12].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def%') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[13].innerHTML = modArray[i]['Def%'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[13].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Pot%') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[14].innerHTML = modArray[i]['Pot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[14].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Ten%') ) {
                sqdtbls[id].tBodies[0].rows[3].cells[15].innerHTML = modArray[i]['Ten%'];
            } else {
                sqdtbls[id].tBodies[0].rows[3].cells[15].innerHTML = '';
            }
        } else if (modArray[i].Slot == "Circle") {
            sqdtbls[id].tBodies[0].rows[4].cells[0].innerHTML = modArray[i].Equipped;
            sqdtbls[id].tBodies[0].rows[4].cells[1].innerHTML = modArray[i].Slot;
            sqdtbls[id].tBodies[0].rows[4].cells[2].innerHTML = modArray[i].Set;
            sqdtbls[id].tBodies[0].rows[4].cells[3].innerHTML = modArray[i].Primary;

            if ( modArray[i].hasOwnProperty('Spd') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[4].innerHTML = modArray[i]['Spd'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[4].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Crit%') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[5].innerHTML = modArray[i]['Crit%'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[5].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[6].innerHTML = modArray[i]['Off'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[6].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off%') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[7].innerHTML = modArray[i]['Off%'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[7].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[8].innerHTML = modArray[i]['Prot'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[8].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot%') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[9].innerHTML = modArray[i]['Prot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[9].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[10].innerHTML = modArray[i]['HP'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[10].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP%') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[11].innerHTML = modArray[i]['HP%'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[11].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[12].innerHTML = modArray[i]['Def'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[12].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def%') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[13].innerHTML = modArray[i]['Def%'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[13].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Pot%') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[14].innerHTML = modArray[i]['Pot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[14].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Ten%') ) {
                sqdtbls[id].tBodies[0].rows[4].cells[15].innerHTML = modArray[i]['Ten%'];
            } else {
                sqdtbls[id].tBodies[0].rows[4].cells[15].innerHTML = '';
            }
        } else if (modArray[i].Slot == "Cross") {
            sqdtbls[id].tBodies[0].rows[5].cells[0].innerHTML = modArray[i].Equipped;
            sqdtbls[id].tBodies[0].rows[5].cells[1].innerHTML = modArray[i].Slot;
            sqdtbls[id].tBodies[0].rows[5].cells[2].innerHTML = modArray[i].Set;
            sqdtbls[id].tBodies[0].rows[5].cells[3].innerHTML = modArray[i].Primary;

            if ( modArray[i].hasOwnProperty('Spd') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[4].innerHTML = modArray[i]['Spd'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[4].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Crit%') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[5].innerHTML = modArray[i]['Crit%'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[5].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[6].innerHTML = modArray[i]['Off'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[6].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off%') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[7].innerHTML = modArray[i]['Off%'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[7].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[8].innerHTML = modArray[i]['Prot'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[8].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot%') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[9].innerHTML = modArray[i]['Prot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[9].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[10].innerHTML = modArray[i]['HP'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[10].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP%') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[11].innerHTML = modArray[i]['HP%'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[11].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[12].innerHTML = modArray[i]['Def'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[12].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def%') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[13].innerHTML = modArray[i]['Def%'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[13].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Pot%') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[14].innerHTML = modArray[i]['Pot%'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[14].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Ten%') ) {
                sqdtbls[id].tBodies[0].rows[5].cells[15].innerHTML = modArray[i]['Ten%'];
            } else {
                sqdtbls[id].tBodies[0].rows[5].cells[15].innerHTML = '';
            }
        }
    }
}
//Change assigned values in dataTable to show the item is now in one of the assigned tables. Figure out when to save the json with changes? After redraw? Maybe save event is easiest? Warn on refresh that assigned values will be cleared.
recolor = function ( namesearch, id ) {
    $('#moddata').DataTable().rows().every( function () {
        // check for which assigned table was used
        if (id == 0) {
            // clear out any previous assignment that is now incorrect
            if (this.data().Assigned == '1st' && this.data().Equipped != namesearch) {
                this.data().Assigned = '';
            // enter the correct value into assigned to color the row based on the table it's in.
            } else if (this.data().Equipped == namesearch) {
                this.data().Assigned = '1st';
            }
        } else if (id == 1) {
            // clear out any previous assignment that is now incorrect
            if (this.data().Equipped != namesearch && this.data().Assigned == '2nd') {
                this.data().Assigned = '';
            // enter the correct value into assigned to color the row based on the table it's in.
            } else if (this.data().Equipped == namesearch) {
                this.data().Assigned = '2nd';
            }
        } else if (id == 2) {
            // clear out any previous assignment that is now incorrect
            if (this.data().Equipped != namesearch && this.data().Assigned == '3rd') {
                this.data().Assigned = '';
            // enter the correct value into assigned to color the row based on the table it's in.
            } else if (this.data().Equipped == namesearch) {
                this.data().Assigned = '3rd';
            }
        } else if (id == 3) {
            // clear out any previous assignment that is now incorrect
            if (this.data().Equipped != namesearch && this.data().Assigned == '4th') {
                this.data().Assigned = '';
            // enter the correct value into assigned to color the row based on the table it's in.
            } else if (this.data().Equipped == namesearch) {
                this.data().Assigned = '4th';
            }
        } else if (id == 4) {
            // clear out any previous assignment that is now incorrect
            if (this.data().Equipped != namesearch && this.data().Assigned == '5th') {
                this.data().Assigned = '';
            // enter the correct value into assigned to color the row based on the table it's in.
            } else if (this.data().Equipped == namesearch) {
                this.data().Assigned = '5th';
            }
        }
    });
}

recolorsngl = function ( namesearch, id, asSlot ) {
    $('#moddata').DataTable().rows().every( function () {
        // check for which assigned table was used
        if (id == 0) {
            // clear out any previous assignment that is now incorrect
            if (this.data().Equipped != namesearch && this.data().Assigned == '1st' && this.data().Slot == asSlot) {
                this.data().Assigned = '';
            // enter the correct value into assigned to color the row based on the table it's in.
            } else if (this.data().Equipped == namesearch && this.data().Slot == asSlot) {
                this.data().Assigned = '1st';
            }
        } else if (id == 1) {
            // clear out any previous assignment that is now incorrect
            if (this.data().Equipped != namesearch && this.data().Assigned == '2nd' && this.data().Slot == asSlot) {
                this.data().Assigned = '';
            // enter the correct value into assigned to color the row based on the table it's in.
            } else if (this.data().Equipped == namesearch && this.data().Slot == asSlot) {
                this.data().Assigned = '2nd';
            }
        } else if (id == 2) {
            // clear out any previous assignment that is now incorrect
            if (this.data().Equipped != namesearch && this.data().Assigned == '3rd' && this.data().Slot == asSlot) {
                this.data().Assigned = '';
            // enter the correct value into assigned to color the row based on the table it's in.
            } else if (this.data().Equipped == namesearch && this.data().Slot == asSlot) {
                this.data().Assigned = '3rd';
            }
        } else if (id == 3) {
            // clear out any previous assignment that is now incorrect
            if (this.data().Equipped != namesearch && this.data().Assigned == '4th' && this.data().Slot == asSlot) {
                this.data().Assigned = '';
            // enter the correct value into assigned to color the row based on the table it's in.
            } else if (this.data().Equipped == namesearch && this.data().Slot == asSlot) {
                this.data().Assigned = '4th';
            }
        } else if (id == 4) {
            // clear out any previous assignment that is now incorrect
            if (this.data().Equipped != namesearch && this.data().Assigned == '5th' && this.data().Slot == asSlot) {
                this.data().Assigned = '';
            // enter the correct value into assigned to color the row based on the table it's in.
            } else if (this.data().Equipped == namesearch && this.data().Slot == asSlot) {
                this.data().Assigned = '5th';
            }
        }
    });
}