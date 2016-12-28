const chalk = require('chalk')
const git = require('../dist/git')

git.check()
   .then((valid) => {
     if (valid) {
       console.log(chalk.green('git check pass'))
     } else {
       console.log(chalk.yellow('git not installed'))
     }
   })
   .catch((error) => {
     console.log(chalk.red(error))
   })
