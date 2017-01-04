const cmd = require('./cmd')

const release = {}

release.start = (name, options) => {
  return cmd.exec(`git flow release start ${name}`, options)
}
release.finish = (name, options) => {
  return cmd.exec(`git flow release finish -m gas ${name}`, options)
}
release.publish = (name, options) => {
  return cmd.exec(`git flow release publish ${name}`, options)
}
release.track = (name, options) => {
  return cmd.exec(`git flow release track ${name}`, options)
}

const util = {}
util.getReleaseVersion = (name) => {
  const versionMatch = name.match(/release\/(.*)/)
  if (versionMatch === null) {
    return null
  }
  return versionMatch[1]
}

module.exports = {
  util,
  release,
}
