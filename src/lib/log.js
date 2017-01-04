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

function build(styles) {
  const builder = function (...args) {
    const result = styles.reduce((previous, current) => {
      return previous[current]
    }, chalk)
    /* eslint-disable no-console */
    return console.log(result(...args))
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

Log.prototype.debug = (...args) => {
  /* eslint-disable no-console */
  console.log(...args)
}

Log.prototype.info = (...args) => {
  /* eslint-disable no-console */
  console.log(...args)
}

const log = new Log()
module.exports = log
