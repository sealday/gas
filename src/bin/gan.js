#!/usr/bin/env node

const program = require('commander')
const execSync = require('child_process').execSync
const util = require('../lib/util')
const log = require('./log')
const version = require('../../package.json').version

util.loadConfig()
    .then((config) => {
      program
        .version(version, '-V, --version')
        .command('init', 'init gan')
        .command('reset', 'reset gan config')
        .command('add', 'git add')
        .command('commit', 'git commit')
        .command('branch', 'git branch')
        .command('push', 'git push')
      return config
    })
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
      return config
    })
    .catch((error) => {
      log.bold.red(error)
    })

