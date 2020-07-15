const fs = require('fs');
const https = require('https');

var plyrString = '896282714'
var fileString = __dirname +'\\AcctData\\'+ plyrString +'.json'

// check if the file exists, atm on error just display msg, later it will need to perform the request for the file from api.
fs.access(fileString, (err) => {
  if (err) {
    console.log('File Check Error');
    https.get('https://swgoh.gg/api/players/'+ plyrString +'/mods/', (data) => {
      console.log('Fetching Data');
      console.log(data.statusCode);

      // response result, concatonated from the data buffer
      var body = '';

      data.on('data', (bufr) => {
        body += bufr;
      });

      data.on('end', () => {
        // create json object
        var parsedJSON = JSON.parse(body);

        // checking the parsed json
        fs.writeFile(__dirname +'\\AcctData\\zTesting.json', JSON.stringify(parsedJSON), (err) => {
          if (err) {
            console.log('Test Write File Error');
          } else {
            console.log('Test File has been saved');
          }          
        });

        /* ahh do I put convertJSON in as the step1 function?!? o.0
        const writeFilePromise = new promise ( (err, step1) => {
          .then()
        });*/

        // convert the data into the correct format
        var converted = convertJSON(parsedJSON);

        // write out converted json info
        fs.writeFile(__dirname +'\\AcctData\\'+ plyrString +'.json', converted, (err) => {
          if (err) {
            console.log('Write File Error');
          } else {
            console.log('File has been saved');
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
        console.log (data.slice(0,200));
        jsonFile = data;
        console.log(jsonFile.slice(0,10));
      }
    });
  }
});

convertJSON = function (jsonFile) {
  // create array to assign to json object
  var convertedMods = [];
  // set modCntr
  var modCntr = 0
  jsonFile.mods.forEach( () => {
    // create mod object
    var mod = {};
    mod.Equipped = jsonFile.mods[modCntr].character;
    // get slot
    switch (jsonFile.mods[modCntr].slot) {
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
    // convert the set jsonFile.mods[modCntr].set 1-8
    switch (jsonFile.mods[modCntr].set) {
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
      mod.Primary = jsonFile.mods[modCntr].primary_stat.name;
      // create secondaryCntr
      secondaryCntr = 0;
      // get secondary stats & values
      jsonFile.mods[modCntr].secondary_stats.forEach( () => {
        switch (jsonFile.mods[modCntr].secondary_stats[secondaryCntr].name) {
          case "Health":
            if (jsonFile.mods[modCntr].secondary_stats[secondaryCntr].display_value.includes("%")) {
                mod["HP%"] = jsonFile.mods[modCntr].secondary_stats[secondaryCntr].display_value;
            } else {
                mod["HP"] = jsonFile.mods[modCntr].secondary_stats[secondaryCntr].display_value;
            };
            break;
          case "Protection":
            if (jsonFile.mods[modCntr].secondary_stats[secondaryCntr].display_value.includes("%")) {
                mod["Prot%"] = jsonFile.mods[modCntr].secondary_stats[secondaryCntr].display_value;
            } else {
                mod["Prot"] = jsonFile.mods[modCntr].secondary_stats[secondaryCntr].display_value;
            };
            break;                                
          case "Offense":
            if (jsonFile.mods[modCntr].secondary_stats[secondaryCntr].display_value.includes("%")) {
                mod["Off%"] = jsonFile.mods[modCntr].secondary_stats[secondaryCntr].display_value;
            } else {
                mod["Off"] = jsonFile.mods[modCntr].secondary_stats[secondaryCntr].display_value;
            };
            break;
          case "Defense":
            if (jsonFile.mods[modCntr].secondary_stats[secondaryCntr].display_value.includes("%")) {
                mod["Def%"] = jsonFile.mods[modCntr].secondary_stats[secondaryCntr].display_value;
            } else {
                mod["Def"] = jsonFile.mods[modCntr].secondary_stats[secondaryCntr].display_value;
            };
            break;
          case "Speed":
            mod["Spd"] = jsonFile.mods[modCntr].secondary_stats[secondaryCntr].display_value;
            break;
          case "Critical Chance":
            mod["Crit%"] = jsonFile.mods[modCntr].secondary_stats[secondaryCntr].display_value;
            break;
          case "Potency":
            mod["Pot%"] = jsonFile.mods[modCntr].secondary_stats[secondaryCntr].display_value;
            break;
          case "Tenacity":
            mod["Ten%"] = jsonFile.mods[modCntr].secondary_stats[secondaryCntr].display_value;
            break;
        };
      });
      // add assignment property
      mod.Assigned = "";
      // push into mod array
      convertedMods.push(mod);
      modCntr += 1;
  });
  var convertedModsJSONString = JSON.stringify(convertedMods);
  return convertedModsJSONString;
}