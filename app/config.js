
const SONARQUBE_URL = 'https://sonarqube.as-crdbi-dev.com';

const config = {};
config.sonarqube = {};
config.sonarqube.api = {};
config.sonarqube.url = SONARQUBE_URL;
config.sonarqube.api.key = process.env.SONARQUBE_API_KEY;
config.sonarqube.api.plugins = {
	list: '/api/plugins/installed'
};
config.sonarqube.api.qualitygates = {
	list: '/api/qualitygates/list'
}
config.sonarqube.api.qualityprofiles = {
	list: '/api/qualityprofiles/search',
	backup: '/api/qualityprofiles/backup?key='
}


module.exports = config;