var filelocation = ''; // figure out how to make this available to auto complete without being global? unsure what this is for again...
$(document).ready(function(){
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
                $('.dtWrap').css('display', 'inline');
                $('.assignBtnWrap').css('display','inline')
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
});