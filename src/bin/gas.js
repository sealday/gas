#!/usr/bin/env node

import program from 'commander'
import { execSync } from 'child_process'
import { version } from '../../package.json'
import gas from '../gas/gas'

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
