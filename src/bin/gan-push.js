const execSync = require('child_process').execSync

const name = execSync('git rev-parse --abbrev-ref HEAD').toString()
execSync(`git push origin ${name}`, { stdio: 'inherit' })
