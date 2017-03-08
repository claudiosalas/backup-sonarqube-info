const configuration = require('./config');
const http = require('./http');
const sonarqube = configuration.sonarqube;

const execute = {};

execute.backup = function(path) {
	console.log(`[execute][backup] - Backup will be saved at: ${path}`);
	var opts = {
		host: sonarqube.url,
		path: sonarqube.api.plugins.list
	};
	http.get.json(opts).then(data => console.log(data));
	opts.path = sonarqube.api.qualitygates.list
	http.get.json(opts).then(data => console.log(data));
	opts.path = sonarqube.api.qualityprofiles.list
	http.get.json(opts).then(data => console.log(data));
}

module.exports = execute;