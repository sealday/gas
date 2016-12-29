const path = require('path')

const cwd = process.cwd()

module.exports = {
  configPath: path.join(cwd, 'gan.yml'),
  gitMessagePath: path.join(cwd, '.gitmessage'),
  templateConfigPath: path.join(__dirname, '../../template/gan.yml'),
}
