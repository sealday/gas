const fs = require('fs')
const chalk = require('chalk')
const git = require('../git')
const gitflow = require('../gitflow')
const log = require('../log')
const cmd = require('../cmd')
const semver = require('../semver')
const util = require('../util')

function inputLevel() {
  const options = [{
    type: 'input',
    name: 'tag',
    message: 'Input new version tag:',
  }]
  return cmd.prompt(options)
            .then((answers) => {
              return answers.tag
            })
}

function chooseLevel(semverTag) {
  const levels = [
    `patch: ${semverTag.increase('patch')}`,
    `minor: ${semverTag.increase('minor')}`,
    `major: ${semverTag.increase('major')}`,
    new cmd.Separator(),
    'input new version tag',
  ]
  return cmd.promptList('level', 'Choose new tag level', levels)
            .then((answers) => {
              const match = answers.level.match(/\d+\.\d+\.\d+/)
              if (match === null) {
                return inputLevel()
              }
              return match[0]
            })
}

function start() {
  return git.getTags()
            .then((tags) => {
              if (tags.length === 0) {
                log.yellow('Your have none version tag before.')
                return inputLevel()
              }
              const lastTag = tags[tags.length - 1]
              const semverTag = new semver.Semver(lastTag)
              if (semverTag.version === null) {
                log.yellow(`Your last tag is ${lastTag}, not semver.`)
                return inputLevel()
              }
              log.info(`Your last tag is: ${chalk.bold.green(lastTag)}`)
              return chooseLevel(semverTag)
            })
            .then((tag) => {
              if (tag === null) {
                log.yellow('Cancel release start')
                return Promise.resolve()
              }
              log.yellow(`release start ${tag}`)
              return gitflow.release.start(tag)
            })
}

function finishGitflowRelease(version) {
  return gitflow.release.finish(version)
                .then((stdout) => {
                  log.info(stdout)
                  return git.checkoutBranch('develop')
                })
}

function updateNpm(pPath, version) {
  return util.updateNpmVersion(pPath, version)
             .then(() => {
               cmd.execSync('git add package.json && git commit -m "update version in package.json by gas"')
             })
}

function finishRelease(version) {
  const pPath = util.cwdPath('package.json')
  if (fs.existsSync(pPath)) {
    return cmd.promptConfirm('confirm', 'Update version in package.json?')
              .then((answers) => {
                if (answers.confirm) {
                  return updateNpm(pPath, version)
                }
                return Promise.resolve()
              })
              .then(() => {
                finishGitflowRelease(version)
              })
  }
  return finishGitflowRelease(version)
}

function finish() {
  return git.getCurrentBranch()
            .then(gitflow.util.getReleaseVersion)
            .then((version) => {
              if (version === null) {
                return Promise.reject('Current branch is not release branch.\nPlease checkout release branch')
              }
              return finishRelease(version)
            })
}

function release() {
  return git.getCurrentBranch()
            .then(gitflow.util.getReleaseVersion)
            .then((version) => {
              if (version !== null) {
                return finish()
              }
              return git.getBranches()
                        .then((branches) => {
                          const releaseNames = branches.filter((name) => {
                            return gitflow.util.getReleaseVersion(name) !== null
                          })
                          if (releaseNames.length === 0) {
                            return start()
                          }
                          log.red(`Exsist release branch: ${releaseNames.join(', ')}`)
                          log.red('Checkout release branch at first')
                          return Promise.resolve()
                        })
            })
            .catch((error) => {
              log.red(error)
            })
}

module.exports = {
  release,
  start,
  finish,
}
