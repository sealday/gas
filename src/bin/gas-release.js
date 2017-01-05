const program = require('commander')
const release = require('../gas/release')
const start = require('./gas-release-start')
const finish = require('./gas-release-finish')
const log = require('./log')

const args = process.argv.slice(2)

if (args.length === 0) {
  const version = release.getVersion()
  if (version !== null) {
    finish.finish()
  } else {
    const names = release.getExistRelease()
    if (names.length === 0) {
      start.start()
    } else {
      log.red(`Exist release branch: ${names.join(', ')}\nCheckout these release branch at first`)
    }
  }
} else {
  program.command('start [version]')
         .description('git flow release start')
         .action(start.start)
         .alias('s')

  program.command('finish [version]')
         .description('git flow release finish')
         .action(start.start)
         .alias('f')

  program.parse(process.argv)
}
