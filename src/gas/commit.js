const git = require('./lib/git')
const config = require('./lib/config')
const cmd = require('./lib/cmd')
const log = require('../bin/log')

function prepareStage() {
  if (config.git.commit.auto_stage) {
    git.addAll()
  }
}

function previewChanges() {
  git.showStatus()
}

function prepareMessage() {
  const message = config.git.commit.message
  if (message === null) {
    return Promise.resolve()
  }
  const options = message.map((item) => {
    const name = Object.keys(item).pop()
    const detail = item[name]
    return {
      type: 'input',
      name: name,
      message: detail.comment,
      validate: (text) => {
        if (detail.min && text.length < detail.min) {
          log.red(' <- too short')
          return false
        }
        if (detail.max && text.length > detail.max) {
          log.red(' <- too long')
          return false
        }
        return true
      },
    }
  })
  return cmd.prompt(options).then((answers) => {
    return message
      .filter((item) => {
        const name = Object.keys(item)[0]
        return answers[name].length > 0
      })
      .map((item) => {
        const name = Object.keys(item)[0]
        const template = item[name].template
        return `${template.replace('{}', answers[name])}`
      })
      .join('\n')
  })
}

function commitMessage(message) {
  return cmd.promptConfirm('confirm', 'Make sure to commit?')
            .then((answers) => {
              if (answers.confirm === true) {
                git.commitMessage(message)
              }
            })
}

module.exports = {
  prepareStage,
  previewChanges,
  prepareMessage,
  commitMessage,
}
