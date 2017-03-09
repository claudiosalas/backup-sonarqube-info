const configuration = require('./configuration')
const http = require('./http.helper');

const sonarqube = configuration.sonarqube;

let path;
const execute = {};
const request = {
	host: sonarqube.url
};

execute.backupPluginsList = function(path) {
	request.path = sonarqube.api.plugins.list;
	http.get.json(request)
			.then(data => console.log(data));
};

execute.backupQualityGates = function(path) {
	request.path = sonarqube.api.qualitygates.list
	http.get.json(request)
			.then(data => console.log(data));
};

const saveXMLQualityProfile(xml){
	console.log(xml);
}

const processXMLQualityProfiles = function(data){
	data.profiles.map(profile => {
		request.path = `${sonarqube.api.qualityprofiles.backup}${profile.key}`;
		http.get.xml(request).then(data => saveXMLQualityProfile(data));
		
	});
};

execute.backupQualityProfiles = function(path) {
	request.path = sonarqube.api.qualityprofiles.list
	http.get.json(request).then(data => {
		processXMLQualityProfiles(data);
	});
};

execute.backup = function(path) {
	console.log(`[execute][backup] - Backup will be saved at: ${path}`);
	path = path;
};



module.exports = execute;