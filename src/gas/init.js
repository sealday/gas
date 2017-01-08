const fs = require('fs-extra')
const setting = require('./lib/setting')
const log = require('./lib/log')
const cmd = require('./lib/cmd')

function checkGitInit() {
  cmd.execSync('git status')
  log.success('git inited')
}

function checkGitFlow() {
  try {
    cmd.execSync('git flow feature')
  } catch (error) {
    if (error.message.match(/not a git command/) !== null) {
      const message = `
git-flow not installed
you can install git-flow from here:
https://github.com/nvie/gitflow/wiki/Installation`
      throw new Error(message)
    } else if (error.message.match(/not a gitflow-enabled repo/i) !== null) {
      cmd.execSync('git flow init -df')
    } else {
      throw error
    }
  }
  log.success('git flow inited')
}

async function checkConfig() {
  if (fs.existsSync(setting.configPath)) {
    const options = [{
      type: 'confirm',
      name: 'confirm',
      message: 'Reset your .gas.yml?',
      default: true,
    }]

    const answers = await cmd.prompt(options)
    if (answers.confirm) {
      fs.copySync(setting.templateConfigPath, setting.configPath)
      log.success('config already exists, override')
    } else {
      log.success('config already exists')
    }
  } else {
    fs.copySync(setting.templateConfigPath, setting.configPath)
    log.success('config not exists')
  }
}

async function init() {
  try {
    checkGitInit()
    checkGitFlow()
    await checkConfig()
  } catch (error) {
    log.error(error)
  }
}

module.exports = {
  init,
}
