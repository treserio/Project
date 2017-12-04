$(document).ready(function() {
    $('#moddata').DataTable( {
        //iDisplayLength: -1,
        //lengthMenu: [[10,30,50,-1],[10,30,50,"All"]],
        scrollY: '300px',
        scrollX: "100%",
        paging: false,
        ajax:  "Sert.json",
        dom: 'ltip',
        columns: [
            { data: 'Equipped' },
            { data: 'Slot' },
            { data: 'Set' },
            { data: 'Primary' },
            { data: 'Spd',
            "defaultContent": "" },
            { data: 'Crit_%',
            "defaultContent": "" },
            { data: 'Off',
            "defaultContent": "" },
            { data: 'Off_%',
            "defaultContent": "" },
            { data: 'Prot',
            "defaultContent": "" },
            { data: 'Prot_%',
            "defaultContent": "" },
            { data: 'HP',
            "defaultContent": "" },
            { data: 'HP_%',
            "defaultContent": "" },
            { data: 'Def',
            "defaultContent": "" },
            { data: 'Def_%',
            "defaultContent": "" },
            { data: 'Pot_%',
            "defaultContent": "" },
            { data: 'Ten_%',
            "defaultContent": "" }
        ]
    });

    //select filter search from drop down, try to find again list?
//maybe create a dragtag <drag></drag> for slot column? to cope entire row information to assigned 1, 2, 3, 4, 5



    //Setup - add a text input to each footer cell
    $('.dataTables_scrollFootInner tfoot th srch').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
    } );

    datatableInstance.columns().everey(function() {
        var dataTableColumn = this;
    });

    $(this.tfoot()).find('input').on('keyup', 'change', function() {
        dataTableColumn.search(this.value).draw();
    });
    
    
})