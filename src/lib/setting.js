const path = require('path')

const cwd = process.cwd()

module.exports = {
  configPath: path.join(cwd, '.gas.yml'),
  templateConfigPath: path.join(__dirname, '../../template/.gas.yml'),
}
