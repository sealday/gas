const chalk = require('chalk')

export function green(...args) {
  console.log(chalk.green(args))
}

export function red(...args) {
  console.log(chalk.red(args))
}

export function yellow(...args) {
  console.log(chalk.yellow(args))
}
