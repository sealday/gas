const cmd = require('./lib/cmd')
const git = require('./lib/git')

function choose() {
  const branches = git.getBranches()
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

function checkout(branch) {
  cmd.execSync(`git checkout ${branch}`, { stdio: 'inherit' })
}

module.exports = {
  choose,
  checkout,
}
