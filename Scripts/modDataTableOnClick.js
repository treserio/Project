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
                $('td', row).css("background-color","lightgreen");
            } else if ( data.Assigned == "3rd" ) {
                $('td', row).css("background-color","orange");
            } else if ( data.Assigned == "4th" ) {
                $('td', row).css("background-color",'rgb(160, 81, 160)');
            } else if ( data.Assigned == "5th" ) {
                $('td', row).css("background-color",'rgb(207, 207, 0)');
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
                .search(this.value)
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