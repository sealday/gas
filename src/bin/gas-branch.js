const cmd = require('../lib/cmd')
const git = require('../lib/git')
const log = require('../lib/log')

function showBranches(branches) {
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
    return answers.name
  })
}

git.getBranches()
   .then(showBranches)
   .then((branch) => {
     if (branch.match(/^\* /) === null) {
       cmd.execSync(`git checkout ${branch}`, { stdio: 'inherit' })
     }
   })
   .catch((error) => {
     log.red(error)
   })
