const commit = require('../lib/gas/commit')
const log = require('../lib/log')

commit.commit()
      .catch((error) => {
        log.red(error)
      })
