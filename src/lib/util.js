const fs = require('fs')

exports.copyFile = (source, target) => {
  return new Promise((resolve, reject) => {
    const rs = fs.createReadStream(source)
    const ws = fs.createWriteStream(target)
    const rejectCleanup = (error) => {
      console.log(error)
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
