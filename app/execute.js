const configuration = require('./config')
const execute = {};

execute.init = function(path) {
	console.log(`Path received as argument: ${path}`);
	console.log(`{config.sonarqube.api.key}`);
	console.log(`{config.sonarqube.api.plugins.list}`);
	console.log(`{config.sonarqube.api.qualitygates.list}`);
	console.log(`{config.sonarqube.api.qualityprofiles.list}`);
	console.log(`{config.sonarqube.api.qualityprofiles.backup}`);
}

module.exports = execute;