const chalk = require('chalk')

function green(...args) {
  console.log(chalk.green(args))
}

function red(...args) {
  console.log(chalk.red(args))
}

function yellow(...args) {
  console.log(chalk.yellow(args))
}

module.exports = {
  green,
  yellow,
  red,
}
