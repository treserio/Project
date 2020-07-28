const http = require('http');
// for emmitter and working with http requests
const path = require('path');
// path for easy access to system directories
const fs = require('fs');

// I can't remember how this works
const hostname = '127.0.0.1/api/user/';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('index.html', (err, html) => {
      if (err) {
        console.log('error');
      }
      res.writeHeader(200, {'Content-Type': 'text/html'});
      res.write(html);
      res.end();
    })
  }

  if (req.url === '/Scripts/dataTables/dataTables.1.10.16.min.css') {
    fs.readFile('./Scripts/dataTables/dataTables.1.10.16.min.css', (err, css) => {
      if (err) {
        console.log('css1 error');
      }
      res.writeHeader(200, {'Content-Type': 'text/css'});
      res.write(css);
      res.end();
    })
  }

  if (req.url === '/CSS/moddataStyles.min.css') {
    fs.readFile('./CSS/moddataStyles.min.css', (err, css) => {
      if (err) {
        console.log('css2 error');
      }
      res.writeHeader(200, {'Content-Type': 'text/css'});
      res.write(css);
      res.end();
    })
  }

  if (req.url === '/Scripts/jquery-ui-1.12.1/jquery-1.12.4.js') {
    fs.readFile('./Scripts/jquery-ui-1.12.1/jquery-1.12.4.js', (err, js) => {
      if (err) {
        console.log('jquery error');
      }
      res.writeHeader(200, {'Content-Type': 'text/javascript'});
      res.write(js);
      res.end();
    })
  }

  if (req.url === '/Scripts/dataTables/dataTables.1.10.16.min.js') {
    fs.readFile('./Scripts/dataTables/dataTables.1.10.16.min.js', (err, js) => {
      if (err) {
        console.log('dataTables error');
      }
      res.writeHeader(200, {'Content-Type': 'text/javascript'});
      res.write(js);
      res.end();
    })
  }

  if (req.url === '/Scripts/jquery-ui-1.12.1/jquery-ui.min.js') {
    fs.readFile('./Scripts/jquery-ui-1.12.1/jquery-ui.min.js', (err, js) => {
      if (err) {
        console.log('jquery-ui error');
      }
      res.writeHeader(200, {'Content-Type': 'text/javascript'});
      res.write(js);
      res.end();
    })
  }

  if (req.url === '/Scripts/swgoh.win.min.js') {
    fs.readFile('./Scripts/swgoh.win.min.js', (err, js) => {
      if (err) {
        console.log('jquery-ui error');
      }
      res.writeHeader(200, {'Content-Type': 'text/javascript'});
      res.write(js);
      res.end();
    })
  }
/*
  if (req.url === '/AcctData/:id') {

    fs.readFile('./AcctData/'+id+'.json', (err, json) => {
      if (err) {
        console.log('896282714 error');
      }
      res.writeHeader(200, {'Content-Type': 'application/json'});
      res.write(json);
      res.end();
    })
  }
*/
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