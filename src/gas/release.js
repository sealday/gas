const fs = require('fs')
const git = require('./lib/git')
const config = require('./lib/config')
const cmd = require('./lib/cmd')
const semver = require('./lib/semver')
const util = require('./lib/util')
const chalk = require('chalk')
const log = require('./lib/log')

function inputTag() {
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

function chooseTag(semverTag) {
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
                return inputTag()
              }
              return match[0]
            })
}

function inquireTag() {
  const tags = git.getTags()
  if (tags.length === 0) {
    return inputTag()
  }
  const lastTag = git.getLastTag()
  const semverTag = new semver.Semver(lastTag)
  if (semverTag.version === null) {
    return inputTag()
  }
  return chooseTag(semverTag)
}

function start() {
  inquireTag()
    .then((tag) => {
      log.yellow(`release start ${tag}`)
      cmd.execSync(`git flow release start ${tag}`, { stdio: 'inherit' })
    })
    .catch(log.catchError)
}

function updateNpm(pPath, version) {
  return util.updateNpmVersion(pPath, version)
             .then(() => {
               try {
                 cmd.execSync(`git add package.json && git commit -m "${config.git.flow.release.finish_message}"`)
               } catch (error) {
                 // ignore commit error
               }
             })
}

function getVersion() {
  const branch = git.getCurrentBranch()
  return util.extractReleaseVersion(branch)
}

function finishGitflowRelease(tag) {
  const cmdStr = `export GIT_MERGE_AUTOEDIT=no &&git flow release finish -m ${config.git.tag.tag_message.replace(/ /g, '_')} ${tag}`
  cmd.execSync(cmdStr, { stdio: 'inherit' })
  git.checkoutBranch('develop')
}

function finish() {
  const version = getVersion()
  if (version === null) {
    log.red('Current branch is not release branch.\nPlease checkout release branch')
    return
  }
  const finishRelease = () => {
    finishGitflowRelease(version)
  }

  log.info(`Version tag is: ${chalk.bold.green(version)}`)
  const pPath = util.cwdPath('package.json')
  if (fs.existsSync(pPath)) {
    cmd.promptConfirm('confirm', 'Update version in package.json?')
       .then((answers) => {
         if (answers.confirm) {
           return updateNpm(pPath, version)
         }
         return Promise.resolve()
       })
       .then(finishRelease)
       .catch(log.catchError)
  } else {
    finishRelease()
  }
}

function release() {
  const version = getVersion()
  if (version !== null) {
    finish()
  } else {
    const branches = git.getBranches()
    const names = branches.filter(name => util.extractReleaseVersion(name) !== null)
    if (names.length === 0) {
      start()
    } else {
      log.red(`Exist release branch: ${names.join(', ')}\nCheckout these release branch at first`)
    }
  }
}

module.exports = {
  start,
  finish,
  release,
}
