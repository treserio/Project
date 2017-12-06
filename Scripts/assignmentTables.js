// create a table creation method?
//create dom and it should show up, could push to array after created and then iterate to display also?
var sqdtbls = [];


for (var i = 0; i<6; i++){
    sqdtbls.push((document.createElement("table")));
    $(sqdtbls[i]).attr( {
        "id": "Membr"+(i+1),
        "class": "display assigned",
        "width": "100%"
    });
    //var hdr = document.createElement("thead")
    //sqdtbls[i].getElementById('Membr'+i).appendChild(hdr)
    //var tr = document.createElement("TR")
    //document.getElementById()

    //sqdtbls[i].
    //$('#squadMembr'+i).append(sqdtbl[i]);
    //document.getElementById("squadMembr"+i) = sqdtbls[i];
}
console.log(sqdtbls)