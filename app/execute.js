const configuration = require('./config');
const http = require('./http');
const sonarqube = configuration.sonarqube;

const execute = {};
const opts = {
	host: sonarqube.url
};

execute.backupPluginsList = function(path) {
	opts.path = sonarqube.api.plugins.list;
	http.get.json(opts)
			.then(data => console.log(data));
};

execute.backupQualityGates = function(path) {
	opts.path = sonarqube.api.qualitygates.list
	http.get.json(opts)
			.then(data => console.log(data));
};

execute.processXMLQualityProfile = function(xml){
	console.log(xml);
};

execute.backupQualityProfiles = function(path) {
	opts.path = sonarqube.api.qualityprofiles.list
	http.get.json(opts).then(data => {
		data.profiles.map(profile => {
			opts.path = `${sonarqube.api.qualityprofiles.backup}${profile.key}`;
			http.get.xml(opts)
					.then(data => processXMLQualityProfile(data));
			
		});
	});
};

execute.backup = function(path) {
	console.log(`[execute][backup] - Backup will be saved at: ${path}`);
};



module.exports = execute;