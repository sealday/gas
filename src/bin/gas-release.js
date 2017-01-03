const program = require('commander')
const log = require('../lib/log')
const cmd = require('../lib/cmd')

program
  .parse(process.argv)

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
cmd.prompt(options).then((answers) => {
  log.debug(answers)
  switch (answers) {
    case 'start': {
      break
    }
    case 'finish': {
      break
    }
    case 'publish': {
      break
    }
    case 'track': {
      break
    }
    default: {
      break
    }
  }
})
