const execSync = require('child_process').execSync

const params = process.argv.slice(2)

execSync(`git add ${params.join(' ')}`, { stdio: 'inherit' })
