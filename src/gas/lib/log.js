/**
 Modifiers
 - reset
 - bold
 - dim
 - underline
 - inverse
 - hidden

 Colors
 - black
 - red
 - green
 - yellow
 - blue
 - magenta
 - cyan
 - white
 - gray

 Background colors
 - bgBlack
 - bgRed
 - bgGreen
 - bgYellow
 - bgBlue
 - bgMagenta
 - bgCyan
 - bgWhite
 */

const chalk = require('chalk')
const emoji = require('node-emoji')

function Log() {
}

function Builder() {
}

const proto = Object.defineProperties(Builder,
  Object.keys(chalk.styles).reduce((previous, key) => {
    const result = previous
    result[key] = {
      get: function () {
        /* eslint-disable no-use-before-define */
        return build.call(this, this.styles.concat(key))
      },
    }
    return result
  }, {}))

function info(...args) {
  /* eslint-disable no-console */
  console.log(...args)
  /* eslint-enable no-console */
}

function build(styles) {
  const builder = function (...args) {
    const result = styles.reduce((previous, current) => {
      return previous[current]
    }, chalk)
    return info(result(...args))
  }
  builder.styles = styles
  /* eslint-disable no-proto */
  builder.__proto__ = proto
  return builder
}

const propertis = Object.keys(chalk.styles).reduce((previous, current) => {
  const result = previous
  result[current] = {
    get: function () {
      return build([current])
    },
  }
  return result
}, {})

Object.defineProperties(Log.prototype, propertis)

Log.prototype.info = info

Log.prototype.error = (error) => {
  // console.log(error.stack)
  info(chalk.red(error.message))
}

Log.prototype.success = (text) => {
  log.info(`${emoji.get('white_check_mark')} ${text}`)
}

Log.prototype.failure = (text) => {
  log.info(`${emoji.get('negative_squared_cross_mark')} ${text}`)
}

const log = new Log()
module.exports = log
