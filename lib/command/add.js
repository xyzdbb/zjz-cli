#!/usr/bin/env node
const inquirer = require('inquirer');
const symbols = require('log-symbols');
const chalk = require('chalk');
const fs = require('fs');
const tplObj = require(`../../template`);

let question = [
  {
    name: 'name',
    type: 'input',
    message: '请输入模板名称',
    validate(value) {
      if (value === '') {
        return 'Name is required!';
      } else if (tplObj[value]) {
        return 'Template has already existed!';
      }
      return true;
    }
  },
  {
    name: 'url',
    type: 'input',
    message: '请输入模板地址',
    validate(value) {
      if (value === '') {
        return 'The url is required';
      }
      return true;
    }
  }
];

inquirer.prompt(question).then(answers => {
  let { name, url } = answers;
  tplObj[name] = url.replace(/[\u0000-\u0019]/g, '');
  fs.writeFile(
    `${__dirname}/../template.json`,
    JSON.stringify(tplObj),
    'utf-8',
    error => {
      if (error) {
        console.log(symbols.error, error);
      }
      console.log('\n');
      console.log(symbols.success, chalk.green('Added successfully!\n'));
      console.log(symbols.info, chalk.grey('The latest template list is: \n'));
      console.log(tplObj);
      console.log('\n');
    }
  );
});
