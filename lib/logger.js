const { format } = require('util');
const chalk = require('chalk');
const symbols = require('log-symbols');

const log = (...args) => {
  const msg = format(...args);
  console.log(chalk.white(msg));
};

const info = (...args) => {
  const msg = format(...args);
  console.log(symbols.info, chalk.white(msg));
};

const warning = (...args) => {
  const msg = format(...args);
  console.log(symbols.warning, chalk.yellow(msg));
};

const error = (...args) => {
  const msg = format(...args);
  console.log(symbols.error, chalk.red(msg));
};

const success = (...args) => {
  const msg = format(...args);
  console.log(symbols.success, chalk.green(msg));
};

module.exports = {
  log,
  info,
  warning,
  error,
  success
};
