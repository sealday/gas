const release = require('../gas/release')
const log = require('./log')

function start() {
  release.inquireTag()
         .then((tag) => {
           log.yellow(`release start ${tag}`)
           release.startGitflowRelease(tag)
         })
         .catch(log.catchError)
}
exports.start = start
