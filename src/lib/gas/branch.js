const cmd = require('../cmd')
const git = require('../git')

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

module.exports.branch = () => {
  return git.getBranches()
            .then(showBranches)
            .then((branch) => {
              if (branch.match(/^\* /) === null) {
                cmd.execSync(`git checkout ${branch}`, { stdio: 'inherit' })
              }
            })
}
