const inquirer = require('inquirer')
const program = require('commander')
const log = require('../lib/log')

program
  .parse(process.argv)

const args = program.args

const options = [{
  type: 'list',
  name: 'action',
  message: 'Choose a release action?',
  choices: [
    'start',
    'finish',
    'publish',
    'track',
  ],
}]
inquirer.prompt(options).then((answers) => {
  log.debug(answers)
})
