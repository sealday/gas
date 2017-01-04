const cmd = require('./cmd')

function checkoutBranch(branch) {
  return cmd.exec(`git checkout ${branch}`)
}

function getCurrentBranch() {
  return cmd.exec('git rev-parse --abbrev-ref HEAD')
}

function getBranches() {
  return cmd.exec('git branch')
            .then((stdout) => {
              return stdout.split('\n')
                           .map(name => name.trim())
                           .filter(name => name.length > 0)
            })
}

function getTags() {
  return cmd.exec('git tag')
            .then((stdout) => {
              return stdout.split('\n')
                           .map(name => name.trim())
                           .filter(name => name.length > 0)
            })
}

module.exports = {
  checkoutBranch,
  getCurrentBranch,
  getBranches,
  getTags,
}
