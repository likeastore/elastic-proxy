var config = {
	logentries: {
		token: null
	},

	target: 'http://localhost:9200',

	accessToken: process.env.PROXY_ACCESS_TOKEN
};

module.exports = config;
