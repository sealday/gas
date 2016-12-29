const exec = require('child_process').exec

function check(cb) {
  exec('git version', (error, stdout, stderr) => {
    if (error) {
      cb(error, null)
    } else {
      const valid = (stdout.indexOf('git version') === 0)
      cb(null, valid)
    }
  })
}

module.exports = {
  check,
}
