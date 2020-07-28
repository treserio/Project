const http = require('http');
const url = require('url');
const myFetch = require('./Scripts/nodeGetJSON.js');

const server = http.createServer((req, res) => {

    const qObj = url.parse(req.url, true, true);
    console.log(qObj.host);
    console.log(qObj.pathname);
    console.log(qObj.search);

    if (qObj.pathname = "/api") {
        console.log("Api Hit");
        // RegExp to find exactly 9 chars in the search string
        var testStr = RegExp(/^[0-9]{9}$/);
        
        // test if the search string matches the ally code format of 9 digits
        if (testStr.test(qObj.query.player)) {

            // perform the get and place the data in the AcctData folder
            console.log("passed");
            console.log(qObj.query);
            myFetch.getJSON(qObj.query.player);
            
        }

    }

    if (req.url === "/api") {

        res.write("Found")
        res.end 
    }

});

server.listen(3000);

console.log("listening on port 3000...")