/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
// // first do npm install request
// var request = require('request');
var fs = require('fs');
var http = require('http');
var body = require('./body');
//var results = [{roomname: 'room1', username: 'mala', message: 'hi' }]; 
// exports.results = [];
// exports.body = {results: this.results};

exports.requestHandler = function(request, response) {
  // var results = []; 
  // var body = {results: results};

 console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode = null;
  var headers = defaultCorsHeaders;

  if (request.method === 'OPTIONS') {
    statusCode = 200; 
    response.writeHead(statusCode, headers); 
    response.end(); 
  } 

  

  headers['Content-Type'] = 'application/json';
  console.log(request.method, request.url);
  if (request.url === '/classes/messages') {
    if (request.method === 'GET') {
      statusCode = 200;
      response.writeHead(statusCode, headers);
      var newStorage = JSON.stringify(body.body);
      response.end(newStorage);


    } else if (request.method === 'POST') {
      var storage = [];
      request.on('data', function(chunk) {
        storage.push((chunk));  
        
      });

      request.on('end', function() {
        //storage = Buffer.concat(storage).toString();
        //console.log(JSON.parse(body));
        console.log('POST', body.body.results[0]);

        body.body.results.push(JSON.parse(storage));
        statusCode = 201;
        response.writeHead(statusCode, headers);
        //console.log(body.body.results[0]);
        //response.end();
        response.end(JSON.stringify(body.body));
       
      });
    } else {
      statusCode = 404;
      response.writeHead(statusCode, headers);

      response.end('Hello, World!'); 
    }
  } else {
    statusCode = 200; 
    headers['Content-Type'] = 'text/html';

    var html = fs.readFileSync('./client/index.html');
    response.writeHead(statusCode, headers); 
    response.write(html); 
    response.end(); 
  }


};


   

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

//exports.handleRequest = handleRequest; 

