const fs = require('fs')
const util = require('./lib/util')
const git = require('./lib/git')
const setting = require('./lib/setting')
const log = require('./lib/log')
const cmd = require('./lib/cmd')

function getGitVersion() {
  const stdout = git.getVersion()
  const re = /git version ([^ ]+)/ig
  const result = re.exec(stdout)
  if (result !== null) {
    return result[1]
  }
  return null
}

function checkGitInit() {
  return new Promise((resolve, reject) => {
    cmd.exec('git status', (error) => {
      if (error) {
        cmd.exec('git init', (initError) => {
          if (initError) {
            reject(error)
          } else {
            log.green('not a git repository, init git')
            resolve()
          }
        })
      } else {
        log.green('a valid git repository')
        resolve()
      }
    })
  })
}

function checkGitFlow() {
  try {
    cmd.execSync('git flow feature')
    log.green('git flow inited')
  } catch (error) {
    if (error.message.match(/not a git command/) !== null) {
      throw new Error('git-flow not installed\nyou can install git-flow from here:\nhttps://github.com/nvie/gitflow/wiki/Installation')
    } else if (error.message.match(/not a gitflow-enabled repo/i) !== null) {
      cmd.execSync('git flow init -df')
      log.green('init git flow')
    } else {
      throw error
    }
  }
}

function checkConfig() {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(setting.configPath)) {
      log.green('config already exists')

      const options = [{
        type: 'confirm',
        name: 'confirm',
        message: 'Reset gas config file?',
        default: true,
      }]

      cmd.prompt(options).then((answers) => {
        if (answers.confirm) {
          util.copyFile(setting.templateConfigPath, setting.configPath)
              .then(resolve)
              .catch(reject)
        } else {
          resolve()
        }
      })
    } else {
      log.green('config not exists')
      util.copyFile(setting.templateConfigPath, setting.configPath)
      resolve()
    }
  })
}

function init() {
  checkGitInit()
    .then(checkGitFlow)
    .then(checkConfig)
    .catch(log.catchError)
}

module.exports = {
  getGitVersion,
  init,
}
