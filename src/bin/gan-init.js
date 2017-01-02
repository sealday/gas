const fs = require('fs')
const inquirer = require('inquirer')
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

function checkGitInit() {
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
    exec('git flow feature', (error) => {
      if (error) {
        if (error.message.match(/not a git command/) !== null) {
          reject(new Error(
            'git-flow not installed\n' +
            'you can install git-flow from here:\n' +
            'https://github.com/nvie/gitflow/wiki/Installation'))
        } else if (error.message.match(/not a gitflow-enabled repo/i) !== null) {
          exec('git flow init -df', (initError) => {
            if (initError) {
              reject(initError)
            } else {
              log.green('init git flow')
              resolve()
            }
          })
        } else {
          reject(error)
        }
      } else {
        log.green('git flow inited')
        resolve()
      }
    })
  })
}

function checkConfig() {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(setting.configPath)) {
      log.green('config already exists')

      const options = [{
        type: 'confirm',
        name: 'confirm',
        message: 'Reset your gan.yml?',
        default: true,
      }]

      inquirer.prompt(options).then((answers) => {
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

function setupConfig(config) {
  return new Promise((resolve, reject) => {
    const origin = config.git.remote.origin
    if (origin !== null) {
      exec('git remote remove origin', () => {
        exec(`git remote add origin ${origin}`, (error) => {
          if (error) {
            reject(error)
          } else {
            resolve()
          }
        })
      })
    }
  })
}

checkGitVersion()
  .then(checkGitInit)
  .then(checkGitFlow)
  .then(checkConfig)
  .then(util.loadConfig)
  .then(setupConfig)
  .catch((error) => {
    log.red(error)
  })
