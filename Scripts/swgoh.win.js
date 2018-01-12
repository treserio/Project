$(document).ready(function() {
//Creates an array of tables to allow users to drag mods from the top table to the lower in order to customize sets. When it's assigned to a lower table it should color the associated row in the top.
var sqdTbls = [];
//Creates an array of inputs elements to use just above the tables. These are to get an input that will search the data and populate the associated table with the correct mods for the character name selected.
var nameselect = [];
//Creates an array of buttons to hide the table contents for easier visibility of lower elements
var hideBtn = [];
//Creates an array of buttons to run a clear function on the appropriate color tbl
var clrBtn = [];

var filelocation = '';
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
        'class': 'assigned',
        'width': '1250px',
        'border-collapse':'collapse'
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
        sqdTbls[i].tBodies[0].insertRow();
        // loop through adding cells to rows
        for (var k = 0; k < 16; k++) {
            sqdTbls[i].tBodies[0].rows[j].insertCell();
        }
    }

    // Create tfoot to insert row and cells after calculating totals and setup totals
    sqdTbls[i].createTFoot();
    sqdTbls[i].tFoot.insertRow();
    sqdTbls[i].tFoot.rows[0].appendChild(document.createElement('th'));
    sqdTbls[i].tFoot.rows[0].appendChild(document.createElement('th'));
    sqdTbls[i].tFoot.rows[0].appendChild(document.createElement('th'));
    sqdTbls[i].tFoot.rows[0].appendChild(document.createElement('th')).innerText = 'Totals';
    for ( var footCell = 0; footCell <12; footCell ++ ) {
        sqdTbls[i].tFoot.rows[0].appendChild(document.createElement('th')).innerHTML = 0;
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
$('#srchForm').submit(function(event){
    event.preventDefault();
    // Grab the search text
    srchstring = $('#srchString').val();
    srchstring = srchstring.toLowerCase();
    filelocation = 'AcctData/' +srchstring+ '.json';
    
    // check if resulting url is good? no good method with CORS that'll work. Possibly in an NPM package, yay I have a sticker for that.
    if (srchstring == "") { 
        alert('Please enter a swgoh.gg id');
        
    } else {
        $.getJSON('AcctData/' +srchstring+ '.json', function(jsonfile) {
            // Display the hidden dataTable
            $('.dtWrap').css('display', 'block');
            $('.assignBtnWrap').css('display','block')
            // Populate the dataTable
            drawDataTbl(srchstring);

            // Setup Autocomplete, first create array of names, then apply to autocomplete.
            var namelist = [];
            for (var key in jsonfile.data) {
                //check for unique entries and add to the namelist array for setting autocomplete
                if ($.inArray(jsonfile.data[key].Equipped, namelist) === -1) {
                    namelist.push(jsonfile.data[key].Equipped);
                }
            }
            //Apply autocomplete list to input fields, 0 to 4
            $('[id^=membrName').autocomplete( {
                source: namelist
            });
        //if .getJSON fails run the python script to create the file, probably should move autocomplete out of this function.
        }).fail(function(data) {
            alert('Please contact Sert#7357 on discord\nin order to have your mod data collected');
        })
    }
});
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
        autocompRedraw(modArray, id);
        CalcTotals(id);
        // Display hidden body
        $('#squadMembr'+id+' .assigned tbody').css('display','table-row-group');
        $('[id^=hideShow'+id).attr('value','Hide');
        // Run function to recolor dataTable rows based on assigned table id
        recolor(namesearch, id);
        // Update dataTable to reflect changes
        DTRedraw();
    });
});
// DTRedraw function to persist scroll value on redraw
DTRedraw = function () {
    var scrollPos = $(".dataTables_scrollBody").scrollTop();
    $('#moddata').DataTable().rows().invalidate().draw(false);
    $(".dataTables_scrollBody").scrollTop(scrollPos);
}
// Fills the table based on the sqdTbls array, and changes are reflected when those array values change. This function will not remove any preexisting mods from the assigned table.
redraw = function ( modArray, id ) {
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
autocompRedraw = function ( modArray, id ) {
    var square = 0;
    var arrow = 0;
    var diamond = 0;
    var triangle = 0;
    var circle = 0;
    var cross = 0;

    if (modArray == 'nul') {
        sqdTbls[id].tBodies[0].rows[0].cells[0].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[0].cells[1].innerHTML = '';
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

        sqdTbls[id].tBodies[0].rows[1].cells[0].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[1].cells[1].innerHTML = '';
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

        sqdTbls[id].tBodies[0].rows[2].cells[0].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[2].cells[1].innerHTML = '';
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

        sqdTbls[id].tBodies[0].rows[3].cells[0].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[3].cells[1].innerHTML = '';
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

        sqdTbls[id].tBodies[0].rows[4].cells[0].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[4].cells[1].innerHTML = '';
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

        sqdTbls[id].tBodies[0].rows[5].cells[0].innerHTML = '';
        sqdTbls[id].tBodies[0].rows[5].cells[1].innerHTML = '';
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
    } else {
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
        redraw ( modArray, id );

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
recolorSngl = function ( namesearch, id, asSlot ) {
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
CalcTotals = function (id) {
    for (var col=4; col<16; col++) {
        var Tots = 0;
        for (var row=0; row<6; row++) {
            Tots += Number(sqdTbls[id].tBodies[0].rows[row].cells[col].textContent);
        }
        // limit the output to 2 decimal places for locations that require it
        if ( col%2 === 1 || col == 14 ) {
            if ( Tots !== 0) {
            Tots = Tots.toFixed(2);
            }
        }
        sqdTbls[id].tFoot.rows[0].cells[col].innerHTML = Tots;
    }
}
// Function applied to all hideBtns for toggling the display of the associated colored table
$('[id^=hideShow').on('click', function() {
    var id = this.id.slice(-1);
    $('#modSet'+id+' tbody').toggle('show');
    if (this.value=='Hide') {
        this.value = 'Show';
    } else {
        this.value = 'Hide';
    }
});
// Clear color tbls function
$('[id^=clrBtn').on('click', function() {
    var id = this.id.slice(-1);
    autocompRedraw('nul', id);
    CalcTotals(id);
    recolor('', id);
    DTRedraw();
    $('#squadMembr'+id+' .assigned tbody').css('display','none');
    $('[id^=hideShow'+id).attr('value','Hide');
});

// This fills an existing table with data supplied through the screen scraping of www.swgoh.gg into a json file, the swgoh.gg account name should match the one used for this site.
function drawDataTbl (search) {
    $('#moddata').DataTable( {
        iDisplayLength: 10,
        lengthMenu: [[10,30,50,-1],[10,30,50,"All"]],
        destroy: true,  //rewrites the datatable
        scrollY: '300px',
        scrollX: '100%',
        paging: false,
        //bInfo: false,
        ajax: {
            url: 'AcctData/' +search+ '.json',
        },
        dom: 'ltip', //removes top search bar
        // should enable a fixed column on the left, but isn't working command = fixedColums:
        // hiding the Assigned column
        columnDefs: [ {
            targets: [16],
            visible: false,
            searchable: false
        } ],
        // data: 'titles' have to match <th> elements in the target table
        columns: [
            { data: 'Equipped', width: '90px'},
            { data: 'Slot'  },
            { data: 'Set', width: '40px' },
            { data: 'Primary' },
            { data: 'Spd',
            defaultContent: "", },
            { data: 'Crit%',
            defaultContent: "" },
            { data: 'Off',
            defaultContent: "" },
            { data: 'Off%',
            defaultContent: "" },
            { data: 'Prot',
            defaultContent: "" },
            { data: 'Prot%',
            defaultContent: "" },
            { data: 'HP',
            defaultContent: "" },
            { data: 'HP%',
            defaultContent: "" },
            { data: 'Def',
            defaultContent: "" },
            { data: 'Def%',
            defaultContent: "" },
            { data: 'Pot%',
            defaultContent: "" },
            { data: 'Ten%',
            defaultContent: "" },
            { data: 'Assigned',
            defaultContent: "" }
        ],
        // Function for coloring table rows based on assigned values
        rowCallback: function( row, data, index ) {
            if ( data.Assigned == "" ) {
                $('td', row).css("background-color","");
            } else if ( data.Assigned == "1st" ) {
                $('td', row).css("background-color","lightblue");
            } else if ( data.Assigned == "2nd" ) {
                $('td', row).css("background-color","rgba(144, 238, 144, 0.788)");
            } else if ( data.Assigned == "3rd" ) {
                $('td', row).css("background-color","rgba(255, 166, 0, 0.850)");
            } else if ( data.Assigned == "4th" ) {
                $('td', row).css("background-color",'rgba(189, 96, 189, 0.788)');
            } else if ( data.Assigned == "5th" ) {
                $('td', row).css("background-color",'rgba(245, 245, 113, 0.780)');
            }
        }
    });
//select filter search from drop down, try to find again list? This would be for those with only ~6 options

     //Setup - add a text input to each footer cell
    $('.dataTables_scrollFootInner srch').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
    });

    var table = $('#moddata').DataTable();
    
    // Apply the filter
    table.columns().every( function () {
        var column = this;

        $( 'input', this.footer() ).on( 'keyup change', function () {
            column
                .search(this.value, true, false)
                .draw();
        } );
    } );
    
    //Collecting row data on click, will also need a popup to determine where it goes.
    $('.dataTable').on('click', 'tbody tr', function() {
        //Need id to be assigned by clicking on an option and we're done.
        id = $("input[name='modset']:checked").val();
        modArray = [];
        modArray.push(table.row(this).data());
        redraw(modArray, id);
        CalcTotals(id);
        $('#squadMembr'+id+' .assigned tbody').css('display','table-row-group');
        $('[id^=hideShow'+id).attr('value','Hide');
        recolorSngl(modArray[0].Equipped, id, modArray[0].Slot);
        DTRedraw();
    });
}
});