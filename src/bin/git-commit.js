const spawn = require('child_process').spawn

// TODO: load template

// TODO: Interactive template
const params = process.argv.slice(2)

spawn('git', ['commit'].concat(params), { stdio: 'inherit' })
