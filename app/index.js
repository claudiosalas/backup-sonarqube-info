#!/usr/bin/env node

const program = require('commander');

program
	.arguments('<path>')
	.action(function(path){
		console.log(`Path passed as argument ${path}`);
	}).parse(process.argv);