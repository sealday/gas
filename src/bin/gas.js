#!/usr/bin/env node

const program = require('commander')
const execSync = require('child_process').execSync
const util = require('../lib/util')
const version = require('../../package.json').version
const log = require('../lib/log')

program
  .version(version, '-V, --version')
  .command('init', 'gan init')
  .alias('i')
  .command('branch', 'git branch')
  .alias('b')
  .command('commit', 'git commit')
  .alias('c')
  .command('release', 'git flow release')
  .alias('r')
// .command('feature', 'git flow feature')
// .alias('f')
// .command('hotfix', 'git flow hotfix')
// .alias('h')

util.loadConfig()
    .then((config) => {
      const alias = config.alias || []
      alias.forEach((item) => {
        Object.keys(item).forEach((name) => {
          program
            .command(name)
            .description(item[name].description)
            .action(() => {
              const cmd = item[name].cmd
              execSync(cmd, { stdio: 'inherit' })
            })
        })
      })
      program.parse(process.argv)
    })
    .catch((error) => {
      log.bold.red(error)
    })

