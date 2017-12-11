var filelocation = '';
$(document).ready(function(){
    $('#srchBtn').click(function(){
        // Grab the search text
        srchstring = $(this).prev().val();
        filelocation = 'AcctData/' +srchstring+ '.json';

        if (srchstring == "") {
            alert('Invalid id');
            //possibly after checking if url is available
        } else {
            // Display the hidden dataTable
            $('.dtWrap').css('display', 'inline');
            
            //Setting up jquery auto complete for squadMembr# fields based on Equipped list in json file.
            $.getJSON('AcctData/' +srchstring+ '.json', function(jsonfile) {
                var namelist = [];
                //check for datafile
                if (jsonfile == null) {  // USE THIS FOR CHECKING IF JSON FILE ALREADY EXISTS
                    console.log('no datafile');
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
            drawDataTbl(srchstring);
        }
    });
});