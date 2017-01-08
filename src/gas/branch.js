const cmd = require('./lib/cmd')
const git = require('./lib/git')
const log = require('./lib/log')

function choose() {
  const branches = git.getBranchesSync()
  let currentIndex = -1
  branches.forEach((name, i) => {
    if (name.match(/^\* /) !== null) {
      currentIndex = i
    }
  })
  return cmd.prompt([{
    type: 'list',
    name: 'name',
    message: 'What branch do you want to checkout?',
    choices: branches,
    default: currentIndex,
  }]).then((answers) => {
    return answers.name.replace(/\* /, '')
  })
}

function checkout(name) {
  cmd.execSync(`git checkout ${name}`, { stdio: 'inherit' })
}

function branch() {
  choose()
    .then(checkout)
    .catch(log.catchError)
}

module.exports = {
  branch,
}
