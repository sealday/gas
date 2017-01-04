const exec = require('child_process').exec
const execSync = require('child_process').execSync
const inquirer = require('inquirer')

module.exports.exec = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        resolve(stdout, stderr)
      }
    })
  })
}

module.exports.execSync = (cmd, options) => {
  return execSync(cmd, options)
}

module.exports.Separator = inquirer.Separator

module.exports.prompt = (options) => {
  return inquirer.prompt(options)
}

module.exports.promptList = (name, message, choices) => {
  const options = [{
    type: 'list',
    name: name,
    message: message,
    choices: choices,
  }]
  return inquirer.prompt(options)
}

module.exports.promptConfirm = (name, message, defaultValue = true) => {
  const options = [{
    type: 'confirm',
    name: name,
    message: message,
    default: defaultValue,
  }]
  return inquirer.prompt(options)
}
