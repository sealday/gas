const branch = require('../gas/branch')
const log = require('./log')

branch.choose()
      .then(branch.checkout)
      .catch(log.catchError)
