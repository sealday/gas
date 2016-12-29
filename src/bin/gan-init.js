const fs = require('fs')
const git = require('../lib/git')
const log = require('./log')

// check git installed
function checkGit() {
  return new Promise((resolve, reject) => {
    git.check((error, valid) => {
      if (error) {
        reject(error)
      }
      if (valid) {
        log.green('git check pass')
        resolve()
      } else {
        reject(new Error('git not installed'))
      }
    })
  })
}

function checkConfig() {
  const configPath = 'gan.yml'
  if (fs.existsSync(configPath)) {
    // TODO: load config file in yaml
    log.green('config exists')
  } else {
    // TODO: init template config file
    log.green('config not exists')
  }
}

checkGit()
  .then(checkConfig)
  .catch((error) => {
    log.red(error)
  })
