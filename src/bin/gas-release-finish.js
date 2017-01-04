const release = require('../lib/gas/release')
const log = require('../lib/log')

release.finish()
       .catch((error) => {
         log.red(error)
       })
