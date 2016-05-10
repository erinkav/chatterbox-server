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
// var fs = require('fs');
var http = require('http');
//var results = [{roomname: 'room1', username: 'mala', message: 'hi' }]; 

exports.handleRequest = function(request, response) {
  var results = [{roomname: 'room1', username: 'mala', message: 'hi' }]; 
  var messages = {results: results};
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode = null;
  
  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'application/json';
  // was this before: 'text/plain';
  
  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  // console.log(request); 
  if (request.method === 'GET' && request.url === '/classes/messages') {
   // request.pipe(response);
    //response.statusCode = 200;
    // //based on the stubs.js, we just need statusCode, not stubs.statusCode
    // console.log('in if statement', request.method); 
    // request.on('error', function(err) {
    //   //console.log(err); 
    //   //potentially only need on 'data' for POST method
    // // }).on('data', function(chunk) {
    // //   results.push(chunk);  
    // }).on('end', function() {
    statusCode = 200;
    response.writeHead(statusCode, headers);
      //JSON.stringify(results);
      // response = Buffer.concat(results).toString();
       //console.log(response.body); 
      //console.log(JSON.stringify(Buffer)); 
      //end is the data we are giving back to user 
      //response.end(expects a string (Json.stringfy results;))
    response.end(JSON.stringify(messages));
     
    //});


  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);

    response.end('Hello, World!'); 
  }



  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  
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

