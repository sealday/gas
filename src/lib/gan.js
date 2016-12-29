const fs = require('fs')
const yaml = require('js-yaml')
const setting = require('./setting')

class Gan {
  constructor() {
    this.config = {}
    this.updateConfig()
  }

  updateConfig() {
    if (fs.existsSync(setting.configPath)) {
      fs.readFile(setting.configPath, {}, (error, data) => {
        if (error) {
          console.log()
        } else {
          this.config = yaml.safeLoad(data)
        }
      })
    }
  }
}

module.exports = new Gan()
