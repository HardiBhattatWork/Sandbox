// Load the http module to create an http server.
var http = require('http');
var url = require("url");
var qs = require('querystring');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {

	// later
	var parts = url.parse(request.url, true);
	var url_parts = url.parse(request.url, true);
	var query = url_parts.query;
	//console.log(url_parts);
	console.log(query.host);
	
	
	response.writeHead(200, {
							"Content-Type": "text/plain",
							"Access-Control-Allow-Origin":"*"
							});
							

	var obj = {
	configurations : [
		 {
			name : "host1",
			hostname : "google-ntp.lab.com",
			port : 1241,
			username : "toto"
		 },
		 {
			name : "host2",
			hostname : "google-xml.lab.com",
			port : 3384,
			username : "admin"
		 }
	 ]
	};
		
	for (var i = 0; i < 10000; i++) { 
		var tempHost = ((i % 2) ? "google-ntp.lab.com" : "google-xml.lab.com");
		var randInt = (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
		obj.configurations.push({ 
			name : "host"+[i+3],	
			hostname : tempHost,
			port : randInt,
			username : "someUser"
		});
	}
	//console.log(JSON.stringify(obj));
	
	if(typeof query.host === 'undefined' || query.host == 0) {
		response.write(JSON.stringify(obj));
	}
	else {
		var count = query.host;		
		response.write(JSON.stringify(obj.configurations[count-1]));
	}
	response.end();
});

// Listen on port 8080, IP defaults to 127.0.0.1
server.listen(8080);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8080/");