#!/usr/bin/env node

const program = require('commander');
const execute = required('./execute')

program
	.arguments('<path>')
	.action(function(path){
		execute.init(path);
	}).parse(process.argv);