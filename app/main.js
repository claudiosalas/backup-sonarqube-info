#!/usr/bin/env node

const program = require('commander');
const execute = require('./execute')

program
    .command('backup [path]')
    .description('Backup SonarQube Information!')
    .option('-p --plugins', 'Backup list of plugins installed.')
    .option('-g --qualitygates', 'Backup quality gates.')
    .option('-q --qualityprofiles', 'Backup quality profiles.')
    .option('-a --all', 'Backup quality profiles.')
	.action(function(path, options){
		if(program.all) {
			return execute.backup(path);
		}

		if(program.plugins) {
			execute.backupPluginsList(path);
		}

		if(program.qualitygates) {
			execute.backupQualityGates(path);
		}
		
		if(program.backupQualityProfiles) {
			execute.backupPluginsList(path);
		}
	}).parse(process.argv);