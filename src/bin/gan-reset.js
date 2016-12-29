const inquirer = require('inquirer')
const util = require('../lib/util')
const setting = require('../lib/setting')
const log = require('./log')

const options = [{
  type: 'confirm',
  name: 'delete',
  message: 'Reset your gan.yml?',
  default: false,
}]

inquirer.prompt(options).then((answers) => {
  if (answers.delete) {
    util.copyFile(setting.templateConfigPath, setting.configPath)
        .then(() => {
          log.green('reset all config')
        })
        .catch((error) => {
          log.red(error)
        })
  } else {
    log.green('cancel reset')
  }
})
