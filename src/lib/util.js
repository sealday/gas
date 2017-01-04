const fs = require('fs')
const yaml = require('js-yaml')
const setting = require('./setting')

exports.copyFile = (source, target) => {
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

exports.loadConfig = () => {
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
