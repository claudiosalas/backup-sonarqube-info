#!/usr/bin/env node

var program = require('commander');
var configuration = require('./config')

var path = program
	.arguments('<path>')
	.action(function(path){
		console.log(`Path passed as argument ${path}`);
	}).parse(process.argv);

console.log(path);
console.log(configuration);
