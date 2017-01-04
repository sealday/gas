const program = require('commander')

program
  .command('start [version]', 'git flow release start')
  .alias('s')
  .command('finish [version]', 'git flow release finish')
  .alias('f')
  .parse(process.argv)
