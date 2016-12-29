const spawn = require('child_process').spawn

const params = process.argv.slice(2)

spawn('git', ['add'].concat(params), { stdio: 'inherit' })
