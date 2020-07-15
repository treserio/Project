const http = require('http');
// for emmitter and working with http requests
const path = require('path');
// path for easy access to system directories
const fs = require('fs');
/*
    Use Asyncronous methods for file access
*/

/* Basic Version
const server = http.createServer();

server.on('connection', (socket) => {
  console.log('Now Connected');
});
*/

// I can't remember how this works
const hostname = '127.0.0.1/api/user/';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Here');
    res.end();
  }

  if (req.url === '/api/user/get') {
    // use path to pull the file name
    const playerData = fs.readFile('/AcctData/my896282714.json', JSON, (err, data) => {
      console.log('read file');
      console.log(data);
    });
    // now use read file info
    res.write(JSON.stringify(playerData));
    res.end;
  }
  
});

server.listen(3000);
console.log('Listening 3000');
/* seems to be causing errors
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/