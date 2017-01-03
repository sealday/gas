const exec = require('child_process').exec

module.exports.getBranches = () => {
  return new Promise((resolve, reject) => {
    exec('git branch', (error, stdout) => {
      if (error) {
        reject(error)
      } else {
        const branches = stdout.split('\n')
                               .map(name => name.trim())
                               .filter(name => name.length > 0)
        resolve(branches)
      }
    })
  })
}
