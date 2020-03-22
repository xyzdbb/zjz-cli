const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '../');
module.exports = {
  ROOT_PATH,
  TEMPLATES_PATH: path.resolve(ROOT_PATH, './templates.json'),
  CLI_INFO_URL: 'https://registry.npm.taobao.org/zjz-cli'
};
