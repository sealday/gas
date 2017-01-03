const semver = require('semver')

module.exports.Level = {
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
    console.log(this.version)
    console.log(level)
    return semver.inc(this.version, level)
  }
}
module.exports.Semver = Semver
