const init = require('../lib/gas/init')
const log = require('../lib/log')

init.init()
    .catch((error) => {
      log.red(error)
    })
