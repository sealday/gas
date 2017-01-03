const cmd = require('./cmd')
const log = require('../lib/log')

const release = {}
release.start = (name) => {
  cmd(`git flow release start ${name}`)
    .then((stdout) => {
      log.debug(stdout)
    })
}
release.finish = (name) => {
  cmd(`git flow release finish ${name}`)
    .then((stdout) => {
      log.debug(stdout)
    })
}
release.publish = (name) => {
  cmd(`git flow release publish ${name}`)
    .then((stdout) => {
      log.debug(stdout)
    })
}
release.track = (name) => {
  cmd(`git flow release track ${name}`)
    .then((stdout) => {
      log.debug(stdout)
    })
}

module.exports = {
  release,
}
