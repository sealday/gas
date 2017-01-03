const cmd = require('./cmd')

function startRelease(name) {
  cmd(`git flow release start ${name}`)
    .then((stdout) => {
      log.debug(stdout)
    })
}

module.exports = {
  startRelease,
}
