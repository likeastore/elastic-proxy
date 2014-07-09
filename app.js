var http = require('http');
var httpProxy = require('http-proxy');
var url = require('url');

var config = require('./config');
var logger = require('./source/utils/logger');

var port = process.env.PORT || 3010;
var proxy = httpProxy.createProxyServer();

var server = http.createServer(function (req, res) {
	var query = url.parse(req.url, true).query;
	var accessToken = query.access_token;

	logger.info('request: ' + req.url + ' accessToken: ' + accessToken);

	if (!accessToken || accessToken !== config.accessToken) {
		return res.end();
	}

	proxy.web(req, res, {target: config.target });
});

server.listen(port, function () {
	logger.info('Likeastore Elastic-Proxy started at: ' + port);
});
