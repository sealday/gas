const inquirer = require('inquirer')
const exec = require('child_process').exec
const execSync = require('child_process').execSync
const log = require('./log')

function getBranches() {
  return new Promise((resolve, reject) => {
    exec('git branch', (error, stdout) => {
      if (error) {
        reject(error)
      } else {
        const branches = stdout.split('\n')
                               .map(name => name.trim())
                               .filter(name => name.length > 0)
        resolve(branches)
      }
    })
  })
}

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

function switchBranch(branch) {
  if (branch.match(/^\* /) !== null) {
    return
  }
  execSync(`git checkout ${branch}`, { stdio: 'inherit' })
}

getBranches()
  .then(showBranches)
  .then(switchBranch)
  .catch((error) => {
    log.red(error)
  })
