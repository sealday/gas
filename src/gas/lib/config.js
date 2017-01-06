const yaml = require('js-yaml')
const fs = require('fs')
const setting = require('./setting')
const log = require('./log')

const config = {}
// TODO: load default config in template
try {
  if (fs.existsSync(setting.configPath)) {
    const data = fs.readFileSync(setting.configPath)
    Object.assign(config, yaml.safeLoad(data))
  }
} catch (error) {
  log.red(error)
}

module.exports = config
