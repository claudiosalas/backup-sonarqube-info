const publicConfig = require('./public.configuration');
const privateConfig = require('./private.configuration');

const configuration = {};

configuration.sonarqube = {};
configuration.sonarqube.api = publicConfig.sonarqube.api;
configuration.sonarqube.api.key = privateConfig.sonarqube.api.key;
configuration.sonarqube.url = privateConfig.sonarqube.url;

module.exports = configuration;