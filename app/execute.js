const configuration = require('./config');
const http = require('./http');
const sonarqube = configuration.sonarqube;

const execute = {};

execute.backup = function(path) {
	console.log(`[execute][backup] - Backup will be saved at: ${path}`);
	console.log(http.get.json(sonarqube.api.plugins.list));
	console.log(http.get.json(sonarqube.api.qualitygates.list));
	console.log(http.get.json(sonarqube.api.qualityprofiles.list));
}


module.exports = execute;