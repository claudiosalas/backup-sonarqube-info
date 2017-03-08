#!/usr/bin/env node

const program = require('commander');
const execute = require('./execute')

program
	.arguments('<path>')
	.action(function(path){
		execute.backup(path);
	}).parse(process.argv);