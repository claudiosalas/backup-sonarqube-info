
const SONARQUBE_URL = 'https://sonarqube.as-crdbi-dev.com';

const config = {};
config.sonarqube = {};
config.sonarqube.api = {};

config.sonarqube.api.key = process.env.SONARQUBE_API_KEY;
config.sonarqube.api.plugins = {
	list: `${SONARQUBE_URL}/api/plugins/installed`
};
config.sonarqube.api.qualitygates = {
	list: `${SONARQUBE_URL}/api/qualitygates/list`
}
config.sonarqube.api.qualityprofiles = {
	list: `${SONARQUBE_URL}/api/qualityprofiles/search`,
	backup: `${SONARQUBE_URL}/api/qualityprofiles/backup?key=`
}


module.exports = config;