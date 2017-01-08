const exec = require('child_process').exec
const execSync = require('child_process').execSync
const inquirer = require('inquirer')

module.exports.exec = (cmd, options) => {
  return new Promise((resolve, reject) => {
    exec(cmd, options, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        resolve(stdout, stderr)
      }
    })
  })
}

module.exports.execSync = (cmd, newOptions = {}) => {
  const defaultOptions = {
    stdio: 'pipe',
  }
  const options = Object.assign(defaultOptions, newOptions)

  try {
    const result = execSync(cmd, options)
    if (result !== null) {
      return result.toString()
    }
    return result
  } catch (error) {
    throw new Error(error.stderr.toString())
  }
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
