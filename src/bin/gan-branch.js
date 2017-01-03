const inquirer = require('inquirer')
const execSync = require('child_process').execSync
const log = require('./log')
const git = require('../lib/git')

function showBranches(branches) {
  let currentIndex = -1
  branches.forEach((name, i) => {
    if (name.match(/^\* /) !== null) {
      currentIndex = i
    }
  })

  return inquirer.prompt([{
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
       execSync(`git checkout ${branch}`, { stdio: 'inherit' })
     }
   })
   .catch((error) => {
     log.red(error)
   })
