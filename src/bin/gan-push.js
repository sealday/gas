const execSync = require('child_process').execSync
const log = require('./log')

const params = process.argv.slice(2)

if (params.length === 0) {
  const name = execSync('git rev-parse --abbrev-ref HEAD').toString()
  execSync(`git push origin ${name}`, { stdio: 'inherit' })
} else {
  execSync(`git push ${params.join(' ')}`, { stdio: 'inherit' })
}
