const chalk = require('chalk')

exports.debug = (...args) => {
  console.log(...args)
}

exports.green = (...args) => {
  console.log(chalk.green(...args))
}

exports.red = (...args) => {
  console.log(chalk.red(...args))
}

exports.yellow = (...args) => {
  console.log(chalk.yellow(...args))
}
