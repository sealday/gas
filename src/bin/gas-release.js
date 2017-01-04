const program = require('commander')
const release = require('../lib/gas/release')
const log = require('../lib/log')

const args = process.argv.slice(2)

if (args.length === 0) {
  release.release()
         .catch((error) => {
           log.red(error)
         })
} else {
  program
    .command('start [version]', 'git flow release start')
    .alias('s')
    .command('finish [version]', 'git flow release finish')
    .alias('f')
    .parse(process.argv)
}
