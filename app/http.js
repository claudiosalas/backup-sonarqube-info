const configuration = require('./config');
const sonarqube = configuration.sonarqube;
const methods = {};
methods.get = {};

const basicAuthorization = function() {
	return 'Basic ' + new Buffer( `${sonarqube.api.key}:` ).toString('base64');
}

const formatOptions = function( { host = null, path = null, method = 'GET' } = {} ) {
	return {
		url: host,
		host: host.replace(/^(https?:|)\/\//,''),
		path: path,
		method: method,
		headers: { 
			Authorization:  basicAuthorization()
		}
	}
}

const httpRequest = function( { options = {}, toJSON = false } = {} ) {
	// return new pending promise
	return new Promise((resolve, reject) => {

		const parseToJSON = function(rawData) {
			try {
				let json = JSON.parse(rawData)
				resolve(json);
			} catch(e) {
				reject(new Error(`It couldn't parse data into json ${e.message}`));
			}
		}

		// select http or https module, depending on reqested url
		const http = options.url.startsWith('https') ? require('https') : require('http');
		const request = http.request(options, (response) => {
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
		request.on('error', (err) => reject(err));
		request.end();
	});
};

methods.get.json = function( options ) {
	return httpRequest( { options: formatOptions(options), toJSON: true } )
		.then(data => data)
		.catch(err => err)
};

methods.get.text = function( options ) {
	return httpRequest( { options: formatOptions(options) } )
		.then(data => data)
		.catch(err => err)
};

methods.get.xml = function( options ) {
	const xmlOptions = formatOptions(options)
	xmlOptions.headers['Content-Type'] = 'text/xml';
	return httpRequest( { options: xmlOptions } )
		.then(data => data)
		.catch(err => err)
};


module.exports = methods;