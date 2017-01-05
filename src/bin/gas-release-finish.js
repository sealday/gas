const chalk = require('chalk')
const release = require('../gas/release')
const log = require('./log')

function finish() {
  const version = release.getVersion()
  if (version !== null) {
    log.info(`Version tag is: ${chalk.bold.green(version)}`)
    release.finishRelease(version).catch(log.catchError)
  } else {
    log.red('Current branch is not release branch.\nPlease checkout release branch')
  }
}
exports.finish = finish
