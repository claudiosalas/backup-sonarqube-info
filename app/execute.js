const configuration = require('./config');
const http = require('./http');
const sonarqube = configuration.sonarqube;

const execute = {};

execute.backup = function(path) {
	console.log(`[execute][backup] - Backup will be saved at: ${path}`);
	http.get.json(sonarqube.api.plugins.list).then(data => console.log(data));
	http.get.json(sonarqube.api.qualitygates.list).then(data => console.log(data));
	http.get.json(sonarqube.api.qualityprofiles.list).then(data => console.log(data));
	


module.exports = execute;