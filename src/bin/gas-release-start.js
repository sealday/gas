const release = require('../lib/gas/release')
const log = require('../lib/log')

release.start()
       .catch((error) => {
         log.red(error)
       })
