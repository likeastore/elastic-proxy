var http = require('http');
var httpProxy = require('http-proxy');
var url = require('url');

var config = require('./config');
var logger = require('./source/utils/logger');

var port = process.env.PORT || 3010;
var proxy = httpProxy.createProxyServer();

var parseAccessToken = function (req) {
	var request = url.parse(req.url, true).query;
	var referer = url.parse(req.headers.referer || '', true).query;

	return request.access_token || referer.access_token;
};

var server = http.createServer(function (req, res) {
	var accessToken = parseAccessToken(req);

	logger.info('request: ' + req.url + ' accessToken: ' + accessToken + ' referer: ' + req.headers.referer);

	if (!accessToken || accessToken !== config.accessToken) {
		res.statusCode = 401;
		return res.end('Missing access_token query parameter');
	}

	proxy.web(req, res, {target: config.target, rejectUnauthorized: false});
});

server.listen(port, function () {
	logger.info('Likeastore Elastic-Proxy started at: ' + port);
});
