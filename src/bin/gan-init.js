const fs = require('fs')
const git = require('../lib/git')
const util = require('../lib/util')
const setting = require('../lib/setting')
const log = require('./log')

function checkGit() {
  return git.version()
            .then((version) => {
              log.green(`git version: ${version}`)
            })
            .then(git.status)
            .then(() => {
              log.green('a valid git repository')
            })
            .catch(() => {
              log.green('not a git repository, git init')
              return git.init()
            })
}

function checkConfig() {
  if (fs.existsSync(setting.configPath)) {
    log.green('config exists')
    return Promise.resolve()
  }
  log.green('config not exists')
  return util.copyFile(setting.templateConfigPath, setting.configPath)
}

checkGit()
  .then(checkConfig)
  .catch((error) => {
    log.red(error)
  })
