const spawn = require('child_process').spawn
const exec = require('child_process').exec
const util = require('../lib/util')
const log = require('./log')
const inquirer = require('inquirer')

// TODO: Interactive template
util.loadConfig()
    .then((config) => {
      return new Promise((resolve, reject) => {
        if (config.git && config.git.template) {
          const template = config.git.template
          const options = template.map((item) => {
            return {
              type: 'input',
              name: item,
              message: item,
            }
          })
          inquirer.prompt(options).then((answers) => {
            log.log(answers)
          })
          resolve(template)
        } else {
          resolve()
        }
      })
    })
    .then(() => {
      // const params = process.argv.slice(2)
      // spawn('git', ['commit'].concat(params), { stdio: 'inherit' })
    })
    .catch((error) => {
      log.red(error)
    })
