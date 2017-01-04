const cmd = require('./cmd')
const log = require('../lib/log')

const release = {}
release.start = (name) => {
  return cmd.exec(`git flow release start ${name}`)
            .then((stdout) => {
              log.debug(stdout)
            })
}
release.finishSync = (name) => {
  cmd.execSync(`git flow release finish ${name}`, { stdio: 'inherit' })
}
release.publish = (name) => {
  return cmd.exec(`git flow release publish ${name}`)
            .then((stdout) => {
              log.debug(stdout)
            })
}
release.track = (name) => {
  return cmd.exec(`git flow release track ${name}`)
            .then((stdout) => {
              log.debug(stdout)
            })
}

module.exports = {
  release,
}
