const fs = require('fs')
const path = require('path')

function copyFile(source, target) {
  return new Promise((resolve, reject) => {
    const rs = fs.createReadStream(source)
    const ws = fs.createWriteStream(target)
    const rejectCleanup = (error) => {
      ws.destroy()
      ws.end()
      reject(error)
    }
    rs.on('error', rejectCleanup)
    ws.on('error', rejectCleanup)
    ws.on('finish', resolve)
    rs.pipe(ws)
  })
}

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
  copyFile,
  updateNpmVersion,
  cwdPath,
  extractReleaseVersion,
}
