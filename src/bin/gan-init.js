const fs = require('fs')
const git = require('../lib/git')
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
