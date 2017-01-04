const git = require('../lib/git')
const gitflow = require('../lib/gitflow')

git.getCurrentBranch()
   .then((branch) => {
     const versionMatch = branch.match(/release\/(.*)/)
     if (versionMatch === null) {
       return Promise.reject('Current branch is not release branch. Please checkout release branch')
     }
     const tag = versionMatch[1]
     return gitflow.release.finish(tag)
                   .then(() => {
                     git.checkoutBranch('develop')
                   })
   })
   .catch((error) => {
     log.red(error)
   })
