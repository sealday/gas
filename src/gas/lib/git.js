const cmd = require('./cmd')

function addAllSync() {
  return cmd.execSync('git add .')
}

function showStatusSync() {
  try {
    cmd.execSync('git status', { stdio: 'inherit' })
  } catch (error) {
    // do nothing
  }
}

function commitMessageSync(message) {
  try {
    cmd.execSync(`git commit -m '${message}'`, { stdio: 'inherit' })
  } catch (error) {
    // do nothing
  }
}

function checkoutBranchSync(branch) {
  return cmd.execSync(`git checkout ${branch}`)
}

function getCurrentBranchSync() {
  return cmd.execSync('git rev-parse --abbrev-ref HEAD')
}

function getVersionSync() {
  return cmd.execSync('git version')
}

function getBranchesSync() {
  const stdout = cmd.execSync('git branch')
  return stdout.split('\n')
               .map(name => name.trim())
               .filter(name => name.length > 0)
}

function getTagsSync() {
  const stdout = cmd.execSync('git tag')
  return stdout.split('\n')
               .map(name => name.trim())
               .filter(name => name.length > 0)
}

function getLastTagSync() {
  return cmd.execSync('git describe --tags $(git rev-list --tags --max-count=1)')
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
