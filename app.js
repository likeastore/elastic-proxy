var http = require('http');
var proxy = require('http-proxy');

var port = process.env.PORT || 3010;

var server = http.createServer();


server.listen(port, function () {
	logger.info('Likeastore Elastic-Proxy started at: ' + port);
});