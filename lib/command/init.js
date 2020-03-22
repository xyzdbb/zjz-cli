#!/usr/bin/env node

const program = require('commander');
const symbols = require('log-symbols');
const chalk = require('chalk');
const ora = require('ora');
const download = require('download-git-repo');
const tplObj = require(`../../template`);

program.usage('<template name> [project-name]');
program.parse(process.argv);

if (program.args.length < 1) {
  return program.help();
}

let templateName = program.args[0];
let projectName = program.args[1];

if (!tplObj[templateName]) {
  console.log(chalk.red('\n Template does not exist! \n'));
  return;
}
if (!projectName) {
  console.log(chalk.red('\n Project should not be empty! \n'));
}

url = tplObj[templateName];

console.log(chalk.white('\n Start generating... \n'));

const spinner = ora('Downloading...');

spinner.start();

download(`https://github.com:${url}`, projectName, { clone: true }, error => {
  if (error) {
    spinner.fail();
    console.log(chalk.red(`Generation failed. ${error}`));
    return;
  }
  spinner.succeed();
  console.log(symbols.success, chalk.green('\n Generation completed!'));
  console.log('\n To get started');
  console.log(`\n  cd ${projectName} \n`);
});
