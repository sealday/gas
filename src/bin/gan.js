#!/usr/bin/env node

const program = require('commander')
const version = require('../../package.json').version

program
  .version(version, '-V, --version')
  .command('init', 'init gan')
  .command('reset', 'reset gan config')
  .command('add', 'git add')
  .command('commit', 'git commit')
  .parse(process.argv)
