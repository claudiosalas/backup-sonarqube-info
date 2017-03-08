const configuration = require('./config');
const http = require('./http');
const sonarqube = configuration.sonarqube;

const execute = {};
const opts = {
	host: sonarqube.url
}

const backupPluginsList = function(path) {
	opts.path = sonarqube.api.plugins.list;
	http.get.json(opts)
			.then(data => console.log(data));
}

const backupQualityGates = function(path) {
	opts.path = sonarqube.api.qualitygates.list
	http.get.json(opts)
			.then(data => console.log(data));
}

const processXMLQualityProfile = function(xml){
	console.log(xml);
}
const backupQualityProfiles = function(path) {
	opts.path = sonarqube.api.qualityprofiles.list
	http.get.json(opts).then(data => {
		data.profiles.map(profile => {
			opts.path = `${sonarqube.api.qualityprofiles.backup}${profile.key}`;
			http.get.xml(opts)
					.then(data => processXMLQualityProfile(data));
			
		});
	});
}

execute.backup = function(path) {
	console.log(`[execute][backup] - Backup will be saved at: ${path}`);
	backupQualityProfiles(path);	
}



module.exports = execute;