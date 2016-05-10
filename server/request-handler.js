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
//  var fs = require('fs');
var http = require('http');
//var results = [{roomname: 'room1', username: 'mala', message: 'hi' }]; 

exports.requestHandler = function(request, response) {
  var results = []; 
  var body = {results: results};

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode = null;
  
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'application/json';

  if (request.method === 'GET' && request.url === '/classes/messages') {
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(body));

  } else if (request.method === 'POST' && request.url === '/classes/messages') {
    var storage = [];
    request.on('data', function(chunk) {
      storage.push((chunk));  
      
    }).on('end', function() {
      storage = Buffer.concat(storage).toString();
      //console.log(JSON.parse(body));
      body.results.push(JSON.parse(storage));
      statusCode = 201;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(body));
     
    });
  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);

    response.end('Hello, World!'); 
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

