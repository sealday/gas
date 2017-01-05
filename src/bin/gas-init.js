const init = require('../gas/init')
const log = require('./log')

init.checkGitInit()
    .then(init.checkGitFlow)
    .then(init.checkConfig)
    .catch(log.catchError)
