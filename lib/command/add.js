#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
const tplObj = require('../../templates.json');
const logger = require('../logger');
const { TEMPLATES_PATH } = require('../config');

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
  fs.writeFile(TEMPLATES_PATH, JSON.stringify(tplObj), 'utf-8', error => {
    if (error) {
      logger.error(error);
    }
    console.log('\n');
    logger.success('Added successfully!\n');
    logger.log('The latest template list is: \n');
    console.log(tplObj);
    console.log('\n');
  });
});
