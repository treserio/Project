//$document ready function...now that I've written all of this I find myself wondering why I didn't just use datatables to do it to begin with.

//Creates an array of tables to allow users to drag mods from the top table to the lower in order to customize sets. When it's assigned to a lower table it should color the associated row in the top.
var sqdTbls = [];
//Creates an array of inputs elements to use just above the tables. These are to get an input that will search the data and populate the associated table with the correct mods for the character name selected.
var nameselect = [];
//Creates an array of buttons to hide the table contents for easier visibility of lower elements
var hideBtn = [];
//Creates an array of buttons to run a clear function on the appropriate color tbl
var clrBtn = [];

// i counter for 5 tables, j counter for 6 rows + headers, k counter for 16 cells in each row
for (var i = 0; i<5; i++) {
    // Name input field for autocomplete and population of table
    nameselect.push(document.createElement('input'));
    $(nameselect[i]).attr({
        'id': 'membrName'+i,
        'type': 'text',
        'placeholder':'Find Mods Equipped by:'
    });
    // Create hidebtn and set attributes
    hideBtn.push(document.createElement('input'));
    $(hideBtn[i]).attr({
        'id':'hideShow'+i,
        'class':'tblBtns',
        'value':'Hide',
        'type':'button'
    })
    // Create clrBtn and set attributes
    clrBtn.push(document.createElement('input'));
    $(clrBtn[i]).attr({
        'id':'clrBtn'+i,
        'class':'tblBtns',
        'value':'Clear',
        'type':'button'
    })
    // Creating table element
    sqdTbls.push(document.createElement('table'));
    $(sqdTbls[i]).attr({
        'class': 'display assigned',
        'width': '1250px'
    });
    // Create Column settings for tables
    sqdTbls[i].appendChild(document.createElement('colgroup'));
    sqdTbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Equipped');
    sqdTbls[i].lastChild.lastChild.setAttribute('width', '90px');
    sqdTbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Slot');
    sqdTbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Set');
    sqdTbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Primary');
    sqdTbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Spd');
    sqdTbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Crit%');
    sqdTbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Off');
    sqdTbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Off%');
    sqdTbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Prot');
    sqdTbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Prot%');
    sqdTbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'HP');
    sqdTbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'HP%');
    sqdTbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Def');
    sqdTbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Def%');
    sqdTbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Pot%');
    sqdTbls[i].lastChild.appendChild(document.createElement('col')).setAttribute('id', 'Ten%');

    // Create Header for First Row
    sqdTbls[i].createTHead();
    sqdTbls[i].tHead.insertRow();
    sqdTbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Equipped';
    sqdTbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Slot';
    sqdTbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Set';
    sqdTbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Primary';
    sqdTbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Spd';
    sqdTbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Crit%';
    sqdTbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Off';
    sqdTbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Off%';
    sqdTbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Prot';
    sqdTbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Prot%';
    sqdTbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'HP';
    sqdTbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'HP%';
    sqdTbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Def';
    sqdTbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Def%';
    sqdTbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Pot%';
    sqdTbls[i].tHead.rows[0].appendChild(document.createElement('th')).innerText = 'Ten%';
    
    // Create tbody to add contents to
    sqdTbls[i].createTBody();
    // loop through adding rows to body
    for (var j = 0; j < 6; j++) {
        sqdTbls[i].tBodies[0].insertRow(j);
        // loop through adding cells to rows
        for (var k = 0; k < 16; k++) {
            sqdTbls[i].tBodies[0].rows[j].insertCell();
        }
    }

    // Create Header Div and fill with necessary items
    var tblHeader = document.createElement('div');
    tblHeader.appendChild(nameselect[i]);
    tblHeader.innerHTML += '<b> Squad Member '+(i+1)+'</b>';
    tblHeader.appendChild(clrBtn[i]);
    tblHeader.appendChild(hideBtn[i]);
    // Apply it to the right squadMembr div
    document.getElementById('squadMembr'+i).appendChild(tblHeader);
    // Create div, set attributes for CSS and fill with table
    var colorTbl = document.createElement('div');
    $(colorTbl).attr({
        'class':'colorTbl',
        'id':'modSet'+i
    });
    colorTbl.appendChild(sqdTbls[i]);
    // Apply it to the right squadMembr div
    document.getElementById('squadMembr'+i).appendChild(colorTbl);
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

// Fills the table based on the sqdTbls array, and changes are reflected when those array values change. This function will not remove any preexisting mods from the assigned table.
Redraw = function ( modArray, id ) {
    for (var i = 0; i < modArray.length; i++) {
        if (modArray[i].Slot == "Square") {
            sqdTbls[id].tBodies[0].rows[0].cells[0].innerHTML = modArray[i].Equipped;
            sqdTbls[id].tBodies[0].rows[0].cells[1].innerHTML = modArray[i].Slot;
            sqdTbls[id].tBodies[0].rows[0].cells[2].innerHTML = modArray[i].Set;
            sqdTbls[id].tBodies[0].rows[0].cells[3].innerHTML = modArray[i].Primary;

            if ( modArray[i].hasOwnProperty('Spd') ) {
                sqdTbls[id].tBodies[0].rows[0].cells[4].innerHTML = modArray[i]['Spd'];
            } else {
                sqdTbls[id].tBodies[0].rows[0].cells[4].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Crit%') ) {
                sqdTbls[id].tBodies[0].rows[0].cells[5].innerHTML = modArray[i]['Crit%'];
            } else {
                sqdTbls[id].tBodies[0].rows[0].cells[5].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off') ) {
                sqdTbls[id].tBodies[0].rows[0].cells[6].innerHTML = modArray[i]['Off'];
            } else {
                sqdTbls[id].tBodies[0].rows[0].cells[6].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off%') ) {
                sqdTbls[id].tBodies[0].rows[0].cells[7].innerHTML = modArray[i]['Off%'];
            } else {
                sqdTbls[id].tBodies[0].rows[0].cells[7].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot') ) {
                sqdTbls[id].tBodies[0].rows[0].cells[8].innerHTML = modArray[i]['Prot'];
            } else {
                sqdTbls[id].tBodies[0].rows[0].cells[8].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot%') ) {
                sqdTbls[id].tBodies[0].rows[0].cells[9].innerHTML = modArray[i]['Prot%'];
            } else {
                sqdTbls[id].tBodies[0].rows[0].cells[9].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP') ) {
                sqdTbls[id].tBodies[0].rows[0].cells[10].innerHTML = modArray[i]['HP'];
            } else {
                sqdTbls[id].tBodies[0].rows[0].cells[10].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP%') ) {
                sqdTbls[id].tBodies[0].rows[0].cells[11].innerHTML = modArray[i]['HP%'];
            } else {
                sqdTbls[id].tBodies[0].rows[0].cells[11].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def') ) {
                sqdTbls[id].tBodies[0].rows[0].cells[12].innerHTML = modArray[i]['Def'];
            } else {
                sqdTbls[id].tBodies[0].rows[0].cells[12].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def%') ) {
                sqdTbls[id].tBodies[0].rows[0].cells[13].innerHTML = modArray[i]['Def%'];
            } else {
                sqdTbls[id].tBodies[0].rows[0].cells[13].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Pot%') ) {
                sqdTbls[id].tBodies[0].rows[0].cells[14].innerHTML = modArray[i]['Pot%'];
            } else {
                sqdTbls[id].tBodies[0].rows[0].cells[14].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Ten%') ) {
                sqdTbls[id].tBodies[0].rows[0].cells[15].innerHTML = modArray[i]['Ten%'];
            } else {
                sqdTbls[id].tBodies[0].rows[0].cells[15].innerHTML = '';
            }
        } else if (modArray[i].Slot == "Arrow") {
            sqdTbls[id].tBodies[0].rows[1].cells[0].innerHTML = modArray[i].Equipped;
            sqdTbls[id].tBodies[0].rows[1].cells[1].innerHTML = modArray[i].Slot;
            sqdTbls[id].tBodies[0].rows[1].cells[2].innerHTML = modArray[i].Set;
            sqdTbls[id].tBodies[0].rows[1].cells[3].innerHTML = modArray[i].Primary;

            if ( modArray[i].hasOwnProperty('Spd') ) {
                sqdTbls[id].tBodies[0].rows[1].cells[4].innerHTML = modArray[i]['Spd'];
            } else {
                sqdTbls[id].tBodies[0].rows[1].cells[4].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Crit%') ) {
                sqdTbls[id].tBodies[0].rows[1].cells[5].innerHTML = modArray[i]['Crit%'];
            } else {
                sqdTbls[id].tBodies[0].rows[1].cells[5].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off') ) {
                sqdTbls[id].tBodies[0].rows[1].cells[6].innerHTML = modArray[i]['Off'];
            } else {
                sqdTbls[id].tBodies[0].rows[1].cells[6].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off%') ) {
                sqdTbls[id].tBodies[0].rows[1].cells[7].innerHTML = modArray[i]['Off%'];
            } else {
                sqdTbls[id].tBodies[0].rows[1].cells[7].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot') ) {
                sqdTbls[id].tBodies[0].rows[1].cells[8].innerHTML = modArray[i]['Prot'];
            } else {
                sqdTbls[id].tBodies[0].rows[1].cells[8].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot%') ) {
                sqdTbls[id].tBodies[0].rows[1].cells[9].innerHTML = modArray[i]['Prot%'];
            } else {
                sqdTbls[id].tBodies[0].rows[1].cells[9].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP') ) {
                sqdTbls[id].tBodies[0].rows[1].cells[10].innerHTML = modArray[i]['HP'];
            } else {
                sqdTbls[id].tBodies[0].rows[1].cells[10].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP%') ) {
                sqdTbls[id].tBodies[0].rows[1].cells[11].innerHTML = modArray[i]['HP%'];
            } else {
                sqdTbls[id].tBodies[0].rows[1].cells[11].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def') ) {
                sqdTbls[id].tBodies[0].rows[1].cells[12].innerHTML = modArray[i]['Def'];
            } else {
                sqdTbls[id].tBodies[0].rows[1].cells[12].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def%') ) {
                sqdTbls[id].tBodies[0].rows[1].cells[13].innerHTML = modArray[i]['Def%'];
            } else {
                sqdTbls[id].tBodies[0].rows[1].cells[13].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Pot%') ) {
                sqdTbls[id].tBodies[0].rows[1].cells[14].innerHTML = modArray[i]['Pot%'];
            } else {
                sqdTbls[id].tBodies[0].rows[1].cells[14].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Ten%') ) {
                sqdTbls[id].tBodies[0].rows[1].cells[15].innerHTML = modArray[i]['Ten%'];
            } else {
                sqdTbls[id].tBodies[0].rows[1].cells[15].innerHTML = '';
            }
        } else if (modArray[i].Slot == "Diamond") {
            sqdTbls[id].tBodies[0].rows[2].cells[0].innerHTML = modArray[i].Equipped;
            sqdTbls[id].tBodies[0].rows[2].cells[1].innerHTML = modArray[i].Slot;
            sqdTbls[id].tBodies[0].rows[2].cells[2].innerHTML = modArray[i].Set;
            sqdTbls[id].tBodies[0].rows[2].cells[3].innerHTML = modArray[i].Primary;

            if ( modArray[i].hasOwnProperty('Spd') ) {
                sqdTbls[id].tBodies[0].rows[2].cells[4].innerHTML = modArray[i]['Spd'];
            } else {
                sqdTbls[id].tBodies[0].rows[2].cells[4].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Crit%') ) {
                sqdTbls[id].tBodies[0].rows[2].cells[5].innerHTML = modArray[i]['Crit%'];
            } else {
                sqdTbls[id].tBodies[0].rows[2].cells[5].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off') ) {
                sqdTbls[id].tBodies[0].rows[2].cells[6].innerHTML = modArray[i]['Off'];
            } else {
                sqdTbls[id].tBodies[0].rows[2].cells[6].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off%') ) {
                sqdTbls[id].tBodies[0].rows[2].cells[7].innerHTML = modArray[i]['Off%'];
            } else {
                sqdTbls[id].tBodies[0].rows[2].cells[7].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot') ) {
                sqdTbls[id].tBodies[0].rows[2].cells[8].innerHTML = modArray[i]['Prot'];
            } else {
                sqdTbls[id].tBodies[0].rows[2].cells[8].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot%') ) {
                sqdTbls[id].tBodies[0].rows[2].cells[9].innerHTML = modArray[i]['Prot%'];
            } else {
                sqdTbls[id].tBodies[0].rows[2].cells[9].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP') ) {
                sqdTbls[id].tBodies[0].rows[2].cells[10].innerHTML = modArray[i]['HP'];
            } else {
                sqdTbls[id].tBodies[0].rows[2].cells[10].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP%') ) {
                sqdTbls[id].tBodies[0].rows[2].cells[11].innerHTML = modArray[i]['HP%'];
            } else {
                sqdTbls[id].tBodies[0].rows[2].cells[11].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def') ) {
                sqdTbls[id].tBodies[0].rows[2].cells[12].innerHTML = modArray[i]['Def'];
            } else {
                sqdTbls[id].tBodies[0].rows[2].cells[12].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def%') ) {
                sqdTbls[id].tBodies[0].rows[2].cells[13].innerHTML = modArray[i]['Def%'];
            } else {
                sqdTbls[id].tBodies[0].rows[2].cells[13].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Pot%') ) {
                sqdTbls[id].tBodies[0].rows[2].cells[14].innerHTML = modArray[i]['Pot%'];
            } else {
                sqdTbls[id].tBodies[0].rows[2].cells[14].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Ten%') ) {
                sqdTbls[id].tBodies[0].rows[2].cells[15].innerHTML = modArray[i]['Ten%'];
            } else {
                sqdTbls[id].tBodies[0].rows[2].cells[15].innerHTML = '';
            }
        } else if (modArray[i].Slot == "Triangle") {
            sqdTbls[id].tBodies[0].rows[3].cells[0].innerHTML = modArray[i].Equipped;
            sqdTbls[id].tBodies[0].rows[3].cells[1].innerHTML = modArray[i].Slot;
            sqdTbls[id].tBodies[0].rows[3].cells[2].innerHTML = modArray[i].Set;
            sqdTbls[id].tBodies[0].rows[3].cells[3].innerHTML = modArray[i].Primary;

            if ( modArray[i].hasOwnProperty('Spd') ) {
                sqdTbls[id].tBodies[0].rows[3].cells[4].innerHTML = modArray[i]['Spd'];
            } else {
                sqdTbls[id].tBodies[0].rows[3].cells[4].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Crit%') ) {
                sqdTbls[id].tBodies[0].rows[3].cells[5].innerHTML = modArray[i]['Crit%'];
            } else {
                sqdTbls[id].tBodies[0].rows[3].cells[5].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off') ) {
                sqdTbls[id].tBodies[0].rows[3].cells[6].innerHTML = modArray[i]['Off'];
            } else {
                sqdTbls[id].tBodies[0].rows[3].cells[6].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off%') ) {
                sqdTbls[id].tBodies[0].rows[3].cells[7].innerHTML = modArray[i]['Off%'];
            } else {
                sqdTbls[id].tBodies[0].rows[3].cells[7].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot') ) {
                sqdTbls[id].tBodies[0].rows[3].cells[8].innerHTML = modArray[i]['Prot'];
            } else {
                sqdTbls[id].tBodies[0].rows[3].cells[8].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot%') ) {
                sqdTbls[id].tBodies[0].rows[3].cells[9].innerHTML = modArray[i]['Prot%'];
            } else {
                sqdTbls[id].tBodies[0].rows[3].cells[9].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP') ) {
                sqdTbls[id].tBodies[0].rows[3].cells[10].innerHTML = modArray[i]['HP'];
            } else {
                sqdTbls[id].tBodies[0].rows[3].cells[10].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP%') ) {
                sqdTbls[id].tBodies[0].rows[3].cells[11].innerHTML = modArray[i]['HP%'];
            } else {
                sqdTbls[id].tBodies[0].rows[3].cells[11].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def') ) {
                sqdTbls[id].tBodies[0].rows[3].cells[12].innerHTML = modArray[i]['Def'];
            } else {
                sqdTbls[id].tBodies[0].rows[3].cells[12].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def%') ) {
                sqdTbls[id].tBodies[0].rows[3].cells[13].innerHTML = modArray[i]['Def%'];
            } else {
                sqdTbls[id].tBodies[0].rows[3].cells[13].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Pot%') ) {
                sqdTbls[id].tBodies[0].rows[3].cells[14].innerHTML = modArray[i]['Pot%'];
            } else {
                sqdTbls[id].tBodies[0].rows[3].cells[14].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Ten%') ) {
                sqdTbls[id].tBodies[0].rows[3].cells[15].innerHTML = modArray[i]['Ten%'];
            } else {
                sqdTbls[id].tBodies[0].rows[3].cells[15].innerHTML = '';
            }
        } else if (modArray[i].Slot == "Circle") {
            sqdTbls[id].tBodies[0].rows[4].cells[0].innerHTML = modArray[i].Equipped;
            sqdTbls[id].tBodies[0].rows[4].cells[1].innerHTML = modArray[i].Slot;
            sqdTbls[id].tBodies[0].rows[4].cells[2].innerHTML = modArray[i].Set;
            sqdTbls[id].tBodies[0].rows[4].cells[3].innerHTML = modArray[i].Primary;

            if ( modArray[i].hasOwnProperty('Spd') ) {
                sqdTbls[id].tBodies[0].rows[4].cells[4].innerHTML = modArray[i]['Spd'];
            } else {
                sqdTbls[id].tBodies[0].rows[4].cells[4].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Crit%') ) {
                sqdTbls[id].tBodies[0].rows[4].cells[5].innerHTML = modArray[i]['Crit%'];
            } else {
                sqdTbls[id].tBodies[0].rows[4].cells[5].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off') ) {
                sqdTbls[id].tBodies[0].rows[4].cells[6].innerHTML = modArray[i]['Off'];
            } else {
                sqdTbls[id].tBodies[0].rows[4].cells[6].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off%') ) {
                sqdTbls[id].tBodies[0].rows[4].cells[7].innerHTML = modArray[i]['Off%'];
            } else {
                sqdTbls[id].tBodies[0].rows[4].cells[7].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot') ) {
                sqdTbls[id].tBodies[0].rows[4].cells[8].innerHTML = modArray[i]['Prot'];
            } else {
                sqdTbls[id].tBodies[0].rows[4].cells[8].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot%') ) {
                sqdTbls[id].tBodies[0].rows[4].cells[9].innerHTML = modArray[i]['Prot%'];
            } else {
                sqdTbls[id].tBodies[0].rows[4].cells[9].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP') ) {
                sqdTbls[id].tBodies[0].rows[4].cells[10].innerHTML = modArray[i]['HP'];
            } else {
                sqdTbls[id].tBodies[0].rows[4].cells[10].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP%') ) {
                sqdTbls[id].tBodies[0].rows[4].cells[11].innerHTML = modArray[i]['HP%'];
            } else {
                sqdTbls[id].tBodies[0].rows[4].cells[11].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def') ) {
                sqdTbls[id].tBodies[0].rows[4].cells[12].innerHTML = modArray[i]['Def'];
            } else {
                sqdTbls[id].tBodies[0].rows[4].cells[12].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def%') ) {
                sqdTbls[id].tBodies[0].rows[4].cells[13].innerHTML = modArray[i]['Def%'];
            } else {
                sqdTbls[id].tBodies[0].rows[4].cells[13].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Pot%') ) {
                sqdTbls[id].tBodies[0].rows[4].cells[14].innerHTML = modArray[i]['Pot%'];
            } else {
                sqdTbls[id].tBodies[0].rows[4].cells[14].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Ten%') ) {
                sqdTbls[id].tBodies[0].rows[4].cells[15].innerHTML = modArray[i]['Ten%'];
            } else {
                sqdTbls[id].tBodies[0].rows[4].cells[15].innerHTML = '';
            }
        } else if (modArray[i].Slot == "Cross") {
            sqdTbls[id].tBodies[0].rows[5].cells[0].innerHTML = modArray[i].Equipped;
            sqdTbls[id].tBodies[0].rows[5].cells[1].innerHTML = modArray[i].Slot;
            sqdTbls[id].tBodies[0].rows[5].cells[2].innerHTML = modArray[i].Set;
            sqdTbls[id].tBodies[0].rows[5].cells[3].innerHTML = modArray[i].Primary;

            if ( modArray[i].hasOwnProperty('Spd') ) {
                sqdTbls[id].tBodies[0].rows[5].cells[4].innerHTML = modArray[i]['Spd'];
            } else {
                sqdTbls[id].tBodies[0].rows[5].cells[4].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Crit%') ) {
                sqdTbls[id].tBodies[0].rows[5].cells[5].innerHTML = modArray[i]['Crit%'];
            } else {
                sqdTbls[id].tBodies[0].rows[5].cells[5].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off') ) {
                sqdTbls[id].tBodies[0].rows[5].cells[6].innerHTML = modArray[i]['Off'];
            } else {
                sqdTbls[id].tBodies[0].rows[5].cells[6].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Off%') ) {
                sqdTbls[id].tBodies[0].rows[5].cells[7].innerHTML = modArray[i]['Off%'];
            } else {
                sqdTbls[id].tBodies[0].rows[5].cells[7].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot') ) {
                sqdTbls[id].tBodies[0].rows[5].cells[8].innerHTML = modArray[i]['Prot'];
            } else {
                sqdTbls[id].tBodies[0].rows[5].cells[8].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Prot%') ) {
                sqdTbls[id].tBodies[0].rows[5].cells[9].innerHTML = modArray[i]['Prot%'];
            } else {
                sqdTbls[id].tBodies[0].rows[5].cells[9].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP') ) {
                sqdTbls[id].tBodies[0].rows[5].cells[10].innerHTML = modArray[i]['HP'];
            } else {
                sqdTbls[id].tBodies[0].rows[5].cells[10].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('HP%') ) {
                sqdTbls[id].tBodies[0].rows[5].cells[11].innerHTML = modArray[i]['HP%'];
            } else {
                sqdTbls[id].tBodies[0].rows[5].cells[11].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def') ) {
                sqdTbls[id].tBodies[0].rows[5].cells[12].innerHTML = modArray[i]['Def'];
            } else {
                sqdTbls[id].tBodies[0].rows[5].cells[12].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Def%') ) {
                sqdTbls[id].tBodies[0].rows[5].cells[13].innerHTML = modArray[i]['Def%'];
            } else {
                sqdTbls[id].tBodies[0].rows[5].cells[13].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Pot%') ) {
                sqdTbls[id].tBodies[0].rows[5].cells[14].innerHTML = modArray[i]['Pot%'];
            } else {
                sqdTbls[id].tBodies[0].rows[5].cells[14].innerHTML = '';
            }
            if (modArray[i].hasOwnProperty('Ten%') ) {
                sqdTbls[id].tBodies[0].rows[5].cells[15].innerHTML = modArray[i]['Ten%'];
            } else {
                sqdTbls[id].tBodies[0].rows[5].cells[15].innerHTML = '';
            }
        }
    }
}
// This redraw method will clear out any missing mods from the assigned colored tables so you can see what that character still needs.
AutoCompRedraw = function ( modArray, id ) {
    var square = 0;
    var arrow = 0;
    var diamond = 0;
    var triangle = 0;
    var circle = 0;
    var cross = 0;

    // set values for each type of mod to know if it exists in the array
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
    // Fill in all available mods
    Redraw ( modArray, id );

    // Draw over any mods missing from the array
    if (square === 0) {
        sqdTbls[id].tBodies[0].rows[0].cells[0].innerHTML = modArray[0].Equipped;
        sqdTbls[id].tBodies[0].rows[0].cells[1].innerHTML = 'Square';
        sqdTbls[id].tBodies[0].rows[0].cells[2].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[0].cells[3].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[0].cells[4].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[0].cells[5].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[0].cells[6].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[0].cells[7].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[0].cells[8].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[0].cells[9].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[0].cells[10].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[0].cells[11].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[0].cells[12].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[0].cells[13].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[0].cells[14].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[0].cells[15].innerHTML = '';
    }
    if (arrow === 0) {
        sqdTbls[id].tBodies[0].rows[1].cells[0].innerHTML = modArray[0].Equipped;
        sqdTbls[id].tBodies[0].rows[1].cells[1].innerHTML = 'Arrow';
        sqdTbls[id].tBodies[0].rows[1].cells[2].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[1].cells[3].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[1].cells[4].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[1].cells[5].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[1].cells[6].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[1].cells[7].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[1].cells[8].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[1].cells[9].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[1].cells[10].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[1].cells[11].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[1].cells[12].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[1].cells[13].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[1].cells[14].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[1].cells[15].innerHTML = '';
    }
    if (diamond === 0) {
        sqdTbls[id].tBodies[0].rows[2].cells[0].innerHTML = modArray[0].Equipped;
        sqdTbls[id].tBodies[0].rows[2].cells[1].innerHTML = 'Diamond';
        sqdTbls[id].tBodies[0].rows[2].cells[2].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[2].cells[3].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[2].cells[4].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[2].cells[5].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[2].cells[6].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[2].cells[7].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[2].cells[8].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[2].cells[9].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[2].cells[10].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[2].cells[11].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[2].cells[12].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[2].cells[13].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[2].cells[14].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[2].cells[15].innerHTML = '';
    }
    if (triangle === 0) {
        sqdTbls[id].tBodies[0].rows[3].cells[0].innerHTML = modArray[0].Equipped;
        sqdTbls[id].tBodies[0].rows[3].cells[1].innerHTML = 'Triangle';
        sqdTbls[id].tBodies[0].rows[3].cells[2].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[3].cells[3].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[3].cells[4].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[3].cells[5].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[3].cells[6].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[3].cells[7].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[3].cells[8].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[3].cells[9].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[3].cells[10].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[3].cells[11].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[3].cells[12].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[3].cells[13].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[3].cells[14].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[3].cells[15].innerHTML = '';
    }
    if (circle === 0) {
        sqdTbls[id].tBodies[0].rows[4].cells[0].innerHTML = modArray[0].Equipped;
        sqdTbls[id].tBodies[0].rows[4].cells[1].innerHTML = 'Circle';
        sqdTbls[id].tBodies[0].rows[4].cells[2].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[4].cells[3].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[4].cells[4].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[4].cells[5].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[4].cells[6].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[4].cells[7].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[4].cells[8].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[4].cells[9].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[4].cells[10].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[4].cells[11].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[4].cells[12].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[4].cells[13].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[4].cells[14].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[4].cells[15].innerHTML = '';
    }
    if (cross === 0) {
        sqdTbls[id].tBodies[0].rows[5].cells[0].innerHTML = modArray[0].Equipped;
        sqdTbls[id].tBodies[0].rows[5].cells[1].innerHTML = 'Cross';
        sqdTbls[id].tBodies[0].rows[5].cells[2].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[5].cells[3].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[5].cells[4].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[5].cells[5].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[5].cells[6].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[5].cells[7].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[5].cells[8].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[5].cells[9].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[5].cells[10].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[5].cells[11].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[5].cells[12].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[5].cells[13].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[5].cells[14].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[5].cells[15].innerHTML = '';
    }        
}
// Change all colors of mods in dataTable based on hidden Assigned value, this one works off of autocomplete values and removes any coloring from mods that don't match the selected autocomplete value.
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
// Change all colors of mods in dataTable based on hidden Assigned value, this one works off of single mod assignment and will only remove coloring from any previous mod matching the same slot.
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

// Function applied to all hideBtns for toggling the display of the associated colored table
$('[id^=hideShow').on('click', function() {
    var id = this.id.slice(-1);
    $('#modSet'+id).toggle('show');
    if (this.value=='Hide') {
        this.value = 'Show';
    } else {
        this.value = 'Hide';
    }
});