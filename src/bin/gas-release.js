const log = require('../lib/log')
const git = require('../lib/git')
const gitflow = require('../lib/gitflow')
const cmd = require('../lib/cmd')
const semver = require('../lib/semver')

// TODO: handle CMD error in promise
function start() {
  const startEmpty = () => {
    const options = [{
      type: 'input',
      name: 'tag',
      message: 'Input new tag:',
    }]
    return cmd.prompt(options)
              .then((answers) => {
                return answers.tag
              })
  }
  return git.getTags()
            .then((tags) => {
              if (tags.length === 0) {
                log.yellow('Your have none tag before.')
                return startEmpty()
              }
              const lastTag = tags[tags.length - 1]
              const semverTag = new semver.Semver(lastTag)
              if (semverTag.version === null) {
                log.yellow(`Your last tag is ${lastTag}, not semver.`)
                return startEmpty()
              }
              const levels = [
                'major',
                'minor',
                'patch',
              ]
              return cmd.promptList('level', 'Choose new tag level', levels)
                        .then((answers) => {
                          const tag = semverTag.increase(answers.level)
                          return cmd.promptConfirm('confirm', `Tag: ${tag}`)
                                    .then((confirmAnswers) => {
                                      if (confirmAnswers.confirm) {
                                        return tag
                                      }
                                      return null
                                    })
                        })
            })
            .then((tag) => {
              if (tag === null) {
                log.yellow('Cancel release start')
                return Promise.resolve()
              }
              log.debug(tag)
              log.yellow(`release start ${tag}`)
              return gitflow.release.start(tag)
            })
}

function finish() {
  return git.getCurrentBranch()
            .then((branch) => {
              const versionMatch = branch.match(/release\/(.*)/)
              if (versionMatch === null) {
                return Promise.reject('Current branch is not release branch. Please checkout release branch')
              }
              const tag = versionMatch[1]
              gitflow.release.finish(tag)
              return git.checkoutBranch('develop')
            })
}

function publish() {

}

function track() {

}

cmd.promptList('action', 'Choose a release action?', ['start', 'finish', 'publish', 'track'])
   .then((answers) => {
     const actions = {
       start,
       finish,
       publish,
       track,
     }
     return actions[answers.action]()
   })
   .catch((error) => {
     log.red(error)
   })
