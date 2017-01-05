const cmd = require('./cmd')

function addAll() {
  return cmd.execSync('git add .')
}

function showStatus() {
  try {
    cmd.execSync('git status', { stdio: 'inherit' })
  } catch (error) {
    // do nothing
  }
}

function commitMessage(message) {
  try {
    cmd.execSync(`git commit -m '${message}'`, { stdio: 'inherit' })
  } catch (error) {
    // do nothing
  }
}

function checkoutBranch(branch) {
  return cmd.execSync(`git checkout ${branch}`)
}

function getCurrentBranch() {
  return cmd.execSync('git rev-parse --abbrev-ref HEAD')
}

function getVersion() {
  return cmd.execSync('git version')
}

function getBranches() {
  const stdout = cmd.execSync('git branch')
  return stdout.split('\n')
               .map(name => name.trim())
               .filter(name => name.length > 0)
}

function getTags() {
  const stdout = cmd.execSync('git tag')
  return stdout.split('\n')
               .map(name => name.trim())
               .filter(name => name.length > 0)
}

function getLastTag() {
  return cmd.execSync('git describe --tags $(git rev-list --tags --max-count=1)')
            .replace('\n', '')
            .trim()
}

module.exports = {
  addAll,
  showStatus,
  commitMessage,
  checkoutBranch,
  getCurrentBranch,
  getBranches,
  getVersion,
  getTags,
  getLastTag,
}
