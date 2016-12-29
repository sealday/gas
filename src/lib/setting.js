const path = require('path')

const cwd = process.cwd()

module.exports = {
  configPath: path.join(cwd, './gan.yml'),
  templateConfigPath: path.join(__dirname, '../../template/gan.yml'),
}
