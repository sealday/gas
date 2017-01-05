const branch = require('../lib/gas/branch')
const log = require('../lib/log')

branch.branch()
      .catch((error) => {
        log.red(error)
      })
