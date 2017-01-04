const log = require('../lib/log')
const git = require('../lib/git')
const gitflow = require('../lib/gitflow')
const cmd = require('../lib/cmd')
const chalk = require('chalk')
const semver = require('../lib/semver')

const startEmpty = () => {
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

git.getTags()
   .then((tags) => {
     if (tags.length === 0) {
       log.yellow('Your have none version tag before.')
       return startEmpty()
     }
     const lastTag = tags[tags.length - 1]
     const semverTag = new semver.Semver(lastTag)
     if (semverTag.version === null) {
       log.yellow(`Your last tag is ${lastTag}, not semver.`)
       return startEmpty()
     }
     log.info(`Your last tag is ${chalk.bold.green(lastTag)}`)
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
                   return startEmpty()
                 }
                 return match[0]
               })
   })
   .then((tag) => {
     if (tag === null) {
       log.yellow('Cancel release start')
       return Promise.resolve()
     }
     log.yellow(`release start ${tag}`)
     return gitflow.release.start(tag)
   })
   .catch((error) => {
     log.red(error)
   })

