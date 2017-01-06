#!/usr/bin/env node --harmony

const program = require('commander')
const execSync = require('child_process').execSync
const version = require('../../package.json').version
const gas = require('../gas/gas')

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

const aliases = gas.getAliases()
aliases.forEach((alias) => {
  program
    .command(alias.name)
    .description(alias.description)
    .action(() => {
      try {
        execSync(alias.cmd, { stdio: 'inherit' })
      } catch (error) {
        // ignore
      }
    })
})
program.parse(process.argv)
