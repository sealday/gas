const config = require('./lib/config')

function getAliases() {
  const aliases = config.alias || []
  const result = []
  aliases.forEach((item) => {
    Object.keys(item).forEach((name) => {
      const alias = item[name]
      result.push({
        name: name,
        description: alias.description,
        cmd: alias.cmd,
      })
    })
  })
  return result
}
module.exports.getAliases = getAliases
