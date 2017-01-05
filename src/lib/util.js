const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const setting = require('./setting')

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

function loadConfig() {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(setting.configPath)) {
      fs.readFile(setting.configPath, {}, (error, data) => {
        if (error) {
          reject(error)
        } else {
          const config = yaml.safeLoad(data)
          resolve(config)
        }
      })
    } else {
      resolve({})
    }
  })
}

function cwdPath(rPath) {
  const cwd = process.cwd()
  return path.join(cwd, rPath)
}

function updateNpmVersion(pPath, version) {
  return new Promise((resolve, reject) => {
    fs.readFile(pPath, (error, data) => {
      if (error) {
        reject(error)
      } else {
        const result = data.toString().replace(/"version".*".*?"/, (match, p1) => {
          return `"version": "${version}"`
        })
        fs.writeFile(pPath, result, 'utf8', (wError) => {
          if (wError) {
            reject(wError)
          } else {
            resolve()
          }
        })
      }
    })
  })
}

module.exports = {
  copyFile,
  loadConfig,
  updateNpmVersion,
  cwdPath,
}
