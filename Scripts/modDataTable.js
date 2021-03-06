// This fills an existing table with data supplied through the screen scraping of www.swgoh.gg into a json file, the swgoh.gg account name should match the one used for this site.
$(document).ready(function() {
    $('#moddata').DataTable( {
        //iDisplayLength: -1,
        //lengthMenu: [[10,30,50,-1],[10,30,50,"All"]],
        scrollY: '300px',
        scrollX: '100%',
        paging: false,
        ajax:  {
            url: 'AcctData/sert.json'            
        },
        dom: 'ltip', //removes top search bar
        // should enable a fixed column on the left, but isn't working
        fixedColumns: {
            leftColumns: 1,
            rightColumns: 0
        },
        columns: [
            { data: 'Equipped', width: '90px'},
            { data: 'Slot'  },
            { data: 'Set', width: '40px' },
            { data: 'Primary' },
            { data: 'Spd',
            defaultContent: "" },
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
            defaultContent: "" }
        ],
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
                .search( this.value )
                .draw();
        } );
    } );
    
})