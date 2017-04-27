// Native
const path = require('path');
const http = require('http');
const fs = require('fs');

// Ours
const types = require('../src/types');

// exports a simple asset server
module.exports = http.createServer((req, res) => {
  // get the image absolute local path & its type
  const file = path.join(__dirname, req.url);
  const fileType = types[path.extname(file).slice(1)];

  const stream = fs.createReadStream(file);

  // stream it...
  stream.on('open', function() {
    res.setHeader('Content-Type', fileType);
    stream.pipe(res);
  });

  // ...or fail!
  stream.on('error', function() {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 404;
    res.end('Not found');
  });
});
