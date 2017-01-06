const program = require('commander')
const release = require('../gas/release')

const args = process.argv.slice(2)

if (args.length === 0) {
  release.release()
} else {
  program.command('start [version]')
         .description('git flow release start')
         .action(release.start)
         .alias('s')

  program.command('finish [version]')
         .description('git flow release finish')
         .action(release.finish)
         .alias('f')

  program.parse(process.argv)
}
