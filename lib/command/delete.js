#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
const tplObj = require(`../../templates.json`);
const logger = require('../logger');
const { TEMPLATES_PATH } = require('../config');

let question = [
  {
    name: 'name',
    message: '请输入要删除的模板名称',
    validate(value) {
      if (value === '') {
        return 'Name is required!';
      } else if (!tplObj[value]) {
        return 'Template does not exist!';
      }
      return true;
    }
  }
];

inquirer.prompt(question).then(answers => {
  let { name } = answers;
  delete tplObj[name];

  fs.writeFile(TEMPLATES_PATH, JSON.stringify(tplObj), 'utf-8', error => {
    if (error) {
      logger.error(error);
    }
    console.log('\n');
    logger.success('Deleted successfully!\n');
    logger.log('The latest template list is: \n');
    console.table(tplObj);
    console.log('\n');
  });
});
