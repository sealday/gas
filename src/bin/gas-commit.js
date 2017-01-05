const commit = require('../gas/commit')
const log = require('./log')

commit.prepareStage()
commit.previewChanges()
commit.prepareMessage()
      .then(commit.commitMessage)
      .catch(log.catchError)
