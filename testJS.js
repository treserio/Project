convertJSON = function () {
    $.getJSON("https://swgoh.gg/api/players/896282714/mods/", function(data){
        var mods = [];
        $.each(data[1], function(mod) {
            mods.push(mod);
        });
    });
    console.log(mods);
};