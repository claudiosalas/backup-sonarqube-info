const http = require('http');
const configuration = require('./config');
const sonarqube = configuration.sonarqube;
const methods = {};
methods.get = {};

const basicAuthorization = function() {
	return 'Basic ' + btoa( `${sonarqube.api.key}:`);
}

const options = function(url) {
	return {
		hostname: url,
		headers: { 
			Authorization:  basicAuthorization();
		}
	}
}

const httpGet = function({ url = null, toJSON = false } = {}) {
	// return new pending promise
	return new Promise((resolve, reject) => {
		// select http or https module, depending on reqested url
		const options = options(url);
		const lib = options.hostname.startsWith('https') ? require('https') : require('http');
		
		const parseToJSON = function(rawData) {
			try {
				let json = JSON.parse(rawData)
				resolve(json);
			} catch(e) {
				reject(new Error(`It couldn't parse data into json ${e.message}`));
			}
		}

		const request = lib.get(options, (response) => {
			const contentType = response.headers['content-type'];
			// handle http errors
			if (response.statusCode < 200 || response.statusCode > 299) {
				reject(new Error(`Failed to load page, status code: ${response.statusCode}`));
			} else if (!/^application\/json/.test(contentType)) {
	    		reject(new Error(`Invalid content-type.\nExpected application/json but received ${contentType}`));
	    	}
			const rawData = [];
			// on every content chunk, push it to the data array
			response.on('data', (chunk) => rawData.push(chunk));
			// we are done, resolve promise with those joined chunks
			response.on('end', () => {
				if(toJSON) {
					parseToJSON(rawData.join(''));
				} else {
					resolve(rawData.join(''));
				}
			});
		});
		// handle connection errors of the request
		request.on('error', (err) => reject(err))
	});
};

methods.get.json = function(url) {
	return httpGet({ url: url, toJSon: true });
		.then(data => return data);
		.catch(err => return err)
};

methods.get.text = function(url) {
	return httpGet({ url: url } );
		.then(data => return data);
		.catch(err => return err)
};


module.exports = methods;