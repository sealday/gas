const cmd = require('./cmd')

function addAllSync(options) {
  return cmd.execSync('git add .', options)
}

function showStatusSync(options) {
  return cmd.execSync('git status', options)
}

function commitMessageSync(message, options) {
  return cmd.execSync(`git commit -m '${message}'`, options)
}

function checkoutBranchSync(branch, options) {
  return cmd.execSync(`git checkout ${branch}`, options)
}

function getCurrentBranchSync(options) {
  return cmd.execSync('git rev-parse --abbrev-ref HEAD', options)
}

function getVersionSync(options) {
  return cmd.execSync('git version', options)
}

function getBranchesSync(options) {
  const stdout = cmd.execSync('git branch', options)
  return stdout.split('\n')
               .map(name => name.trim())
               .filter(name => name.length > 0)
}

function getTagsSync(options) {
  const stdout = cmd.execSync('git tag', options)
  return stdout.split('\n')
               .map(name => name.trim())
               .filter(name => name.length > 0)
}

function getLastTagSync(options) {
  return cmd.execSync('git describe --tags $(git rev-list --tags --max-count=1)', options)
            .replace('\n', '')
            .trim()
}

module.exports = {
  addAllSync,
  showStatusSync,
  commitMessageSync,
  checkoutBranchSync,
  getCurrentBranchSync,
  getBranchesSync,
  getVersionSync,
  getTagsSync,
  getLastTagSync,
}
