module.exports = {

    getJSON: function(plyrID) {
        const https = require('https');
        fileString = __dirname +'\\AcctData\\'+ plyrID +'.json'
        // check if the file exists, atm on error just display msg, later it will need to perform the request for the file from api.
        fs.access(fileString, (err) => {
        if (err) {
            console.log("File Doesn't Exist");
    
            // ****
            // Add a check to make sure the url returns data, if not ask the user to confirm they have an account on swgoh.gg
            // ****
            https.get('https://swgoh.gg/api/players/'+ plyrID +'/mods/', (data) => {
            console.log('Fetching Data');
            console.log(data.statusCode);
    
            // response result, concatonated from the data buffer
            var body = '';
    
            data.on('data', (bufr) => {
                body += bufr;
            });
    
            data.on('end', () => {
                // write out converted json info
                fs.writeFile(__dirname +'\\AcctData\\'+ plyrID +'.json', this.convertJSON(JSON.parse(body)), (err) => {
                if (err) {
                    console.log('Write File Error');
                } else {
                    console.log('File has been saved');
                    // return the read contents as a json object?
                }
                });
            });
            });
        } else {
            // grab the json from the server
            fs.readFile(fileString, 'utf8', (err, data) => {
            if (err) {
                // go get the json from https://swgoh.gg/api/players/896282714/mods/
                console.log('Read File Error', err);
            } else {
                console.log('File Retrieved');
                console.log (data.slice(0,200));
                // return the read contents as a json object?
            }
            });
        }
        });
    },
    
    convertJSON: function (jsonFile) {
        // create array to assign to json object
        var convertedMods = [];
        jsonFile.mods.forEach( (primVal) => {
        // create mod object
        var mod = {};
        mod.Equipped = primVal.character;
        // get slot
        switch (primVal.slot) {
            case 1:
            mod["Slot"] = "Square";
            break;
            case 2:
            mod["Slot"] = "Arrow";
            break;
            case 3:
            mod["Slot"] = "Diamond";
            break;
            case 4:
            mod["Slot"] = "Triangle";
            break;
            case 5:
            mod["Slot"] = "Circle";
            break;
            case 6:
            mod["Slot"] = "Cross";
            break;
        };
        // convert the set primVal.set 1-8
        switch (primVal.set) {
            case 1:
            mod["Set"] = "Health";
            break;
            case 2:
            mod["Set"] = "Offense";
            break;
            case 3:
            mod["Set"] = "Defense";
            break;
            case 4:
            mod["Set"] = "Speed";
            break;
            case 5:
            mod["Set"] = "Critical Chance";
            break;
            case 6:
            mod["Set"] = "Critical Damage";
            break;
            case 7:
            mod["Set"] = "Potency";
            break;
            case 8:
            mod["Set"] = "Tenacity";
            break;                                                    
        };
        // get primary stat
        mod.Primary = primVal.primary_stat.name;
        // get secondary stats & values
        primVal.secondary_stats.forEach( (secVal) => {
            switch (secVal.name) {
            case "Health":
                if (secVal.display_value.includes("%")) {
                mod["HP%"] = parseFloat(secVal.display_value);
                } else {
                mod["HP"] = parseFloat(secVal.display_value);
                };
                break;
            case "Protection":
                if (secVal.display_value.includes("%")) {
                mod["Prot%"] = parseFloat(secVal.display_value);
                } else {
                mod["Prot"] = parseFloat(secVal.display_value);
                };
                break;                                
            case "Offense":
                if (secVal.display_value.includes("%")) {
                mod["Off%"] = parseFloat(secVal.display_value);
                } else {
                mod["Off"] = parseFloat(secVal.display_value);
                };
                break;
            case "Defense":
                if (secVal.display_value.includes("%")) {
                mod["Def%"] = parseFloat(secVal.display_value);
                } else {
                mod["Def"] = parseFloat(secVal.display_value);
                };
                break;
            case "Speed":
                mod["Spd"] = parseFloat(secVal.display_value);
                break;
            case "Critical Chance":
                mod["Crit%"] = parseFloat(secVal.display_value);
                break;
            case "Potency":
                mod["Pot%"] = parseFloat(secVal.display_value);
                break;
            case "Tenacity":
                mod["Ten%"] = parseFloat(secVal.display_value);
                break;
            };
            });
            // add assignment property
            mod.Assigned = "";
            // push into mod array
            convertedMods.push(mod);
        });
        finalForm = {};
        finalForm.data = convertedMods
        var convertedModsJSONString = JSON.stringify(finalForm);
        return convertedModsJSONString;
    }
}