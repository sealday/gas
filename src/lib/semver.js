const semver = require('semver')

const Level = {
  major: 'major',
  premajor: 'premajor',
  minor: 'minor',
  preminor: 'preminor',
  patch: 'patch',
  prepatch: 'prepatch',
}

class Semver {
  constructor(version) {
    this.version = semver.valid(version)
  }

  major() {
    return semver.major(this.version)
  }

  minor() {
    return semver.minor(this.version)
  }

  patch() {
    return semver.patch(this.version)
  }

  increase(level) {
    return semver.inc(this.version, level)
  }
}

module.exports = Semver
