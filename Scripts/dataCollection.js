$(document).ready(function(){
    $('#srchBtn').click(function(){
        // Grab the search text
        srchstring = $(this).prev().val();
        
        if (srchstring == "") {
            alert('Invalid id');
            //possibly after checking if url is available
        } else {
            // Display the hidden dataTable
            $('.dtWrap').css('display', 'inline');
            
            drawDataTbl(srchstring);
        }
    });
});