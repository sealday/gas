const fs = require('fs')
const execSync = require('child_process').execSync
const exec = require('child_process').exec
const util = require('../lib/util')
const setting = require('../lib/setting')
const log = require('./log')

function checkGitVersion() {
  return new Promise((resolve, reject) => {
    exec('git version', (error, stdout) => {
      if (error) {
        reject(error)
      } else {
        const re = /git version ([^ ]+)/ig
        const result = re.exec(stdout)
        if (result !== null && result.length > 1) {
          resolve(result[1])
        } else {
          resolve('null')
        }
      }
    })
  })
}

function checkGitStatus() {
  return new Promise((resolve, reject) => {
    exec('git status', (error) => {
      if (error) {
        exec('git init', (initError) => {
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
  return new Promise((resolve, reject) => {
    exec('git flow init help', (error) => {
      if (error) {
        reject(new Error('git-flow not installed\nyou can install git-flow from here:\n' +
          'https://github.com/nvie/gitflow/wiki/Installation'))
      } else {
        log.green('git flow installed')
        resolve()
      }
    })
  })
}

function checkConfig() {
  if (fs.existsSync(setting.configPath)) {
    log.green('config already exists')
    return Promise.resolve()
  }
  log.green('config not exists')
  return util.copyFile(setting.templateConfigPath, setting.configPath)
}

checkGitVersion()
  .then(checkGitStatus)
  .then(checkGitFlow)
  .then(checkConfig)
  .catch((error) => {
    log.red(error)
  })
