const cmd = require('./cmd')
const log = require('../lib/log')

function startRelease(name) {
  cmd(`git flow release start ${name}`)
    .then((stdout) => {
      log.debug(stdout)
    })
}

module.exports = {
  startRelease,
}
