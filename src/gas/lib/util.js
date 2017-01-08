const fs = require('fs')
const path = require('path')

function cwdPath(rPath) {
  const cwd = process.cwd()
  return path.join(cwd, rPath)
}

function updateNpmVersion(pPath, version) {
  const data = fs.readFileSync(pPath)
  const result = data.toString().replace(/"version".*".*?"/, `"version": "${version}"`)
  fs.writeFileSync(pPath, result, 'utf8')
}

function extractReleaseVersion(name) {
  const versionMatch = name.match(/release\/(.*)/)
  if (versionMatch === null) {
    return null
  }
  return versionMatch[1]
}

module.exports = {
  updateNpmVersion,
  cwdPath,
  extractReleaseVersion,
}
