const util = require('../lib/util')
const cmd = require('../lib/cmd')
const log = require('../lib/log')

function prepareStage(config) {
  if (config.git && config.git.commit && config.git.commit.auto_stage) {
    cmd.execSync('git add .')
  }
  return config
}

function previewChanges(config) {
  cmd.execSync('git status', { stdio: 'inherit' })
  return config
}

function prepareMessage(config) {
  if (config.git && config.git.commit && config.git.commit.message) {
    const message = config.git.commit.message
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
          return `${template.replace('{}', answers[name])}\n`
        })
        .join('\n')
    })
  }
  return null
}

function preCommit(message) {
  return new Promise((resolve, reject) => {
    cmd.promptConfirm('confirm', 'Make sure to commit?')
       .then((answers) => {
         if (answers.confirm === true) {
           resolve(message)
         } else {
           reject(new Error('user canceld'))
         }
       })
       .catch(reject)
  })
}

util.loadConfig()
    .then(prepareStage)
    .then(previewChanges)
    .then(prepareMessage)
    .then(preCommit)
    .then((message) => {
      cmd.execSync(`git commit -m '${message}'`, { stdio: 'inherit' })
    })
    .catch((error) => {
      log.red(error)
    })
