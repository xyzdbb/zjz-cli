#!/usr/bin/env node
const program = require('commander');

program.version(require('../package').version);

program
  .command('add')
  .alias('a')
  .description('add a new template')
  .action(() => require('../lib/command/add'));

program
  .command('delete')
  .alias('d')
  .description('delete a template')
  .action(() => require('../lib/command/delete'));

program
  .command('list')
  .alias('ls')
  .description('list all the templates')
  .action(() => require('../lib/command/list'));
program
  .command('init')
  .alias('i')
  .description('generate a new project from a template')
  .action(() => require('../lib/command/init'));

program.parse(process.argv);

// 只输入zjz时，输出帮助
if (process.argv.length === 2) {
  program.help();
}
