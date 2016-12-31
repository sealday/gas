const inquirer = require('inquirer')
const util = require('../lib/util')
const setting = require('../lib/setting')
const log = require('./log')

const options = [{
  type: 'confirm',
  name: 'confirm',
  message: 'Reset your gan.yml?',
  default: true,
}]

inquirer.prompt(options).then((answers) => {
  if (answers.confirm) {
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
