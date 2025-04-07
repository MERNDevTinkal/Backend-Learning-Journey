 const http = require('node:http');

  // http.createServer([options][, requestListener])

 const server = http.createServer(function(req, res){
    res.end("Hello, Creating First server using node.js!")
 })

 server.listen(5000);