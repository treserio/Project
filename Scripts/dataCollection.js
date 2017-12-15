var filelocation = ''; // figure out how to make this available to auto complete without being global? unsure what this is for again...
$(document).ready(function(){
    $('#srchBtn').click(function(){
        // Grab the search text
        srchstring = $(this).prev().val();
        filelocation = 'AcctData/' +srchstring+ '.json';
        console.log(filelocation);
        if (srchstring == "") { // check if resulting url is good?
            alert('Invalid swgoh id');
            
        } else {
            $.getJSON('AcctData/' +srchstring+ '.json', function(jsonfile) {
                // Display the hidden dataTable
                $('.dtWrap').css('display', 'inline');
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
                alert("Gathering Data"); /*
                $.ajax({
                        url: '/AcctData/modscraper4.py',
                        data: srchstring,
                        success: drawDataTbl(srchstring)
                    }); // now run another getJSON to get the right file? does on success drawDataTbl(srchstring) work? */
            })
        }
    });
});