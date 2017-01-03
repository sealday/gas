const cmd = require('./cmd')

module.exports.getBranches = () => {
  return cmd.exec('git branch')
            .then((stdout) => {
              return stdout.split('\n')
                           .map(name => name.trim())
                           .filter(name => name.length > 0)
            })
}
