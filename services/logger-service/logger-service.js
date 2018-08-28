let winston = require('winston')
let moment = require('moment-timezone')
let _ = require('lodash')
let constants = require('./logger-constants')
class LoggerService {
  constructor (options) {
    this.options = options
    this.createLogger()
  }
  // [{transports:'console',filename:'filename'...},{}]
  createLogger () {
    let transports = []
    _.forEach(this.options.transports, function (transportValue, transport) {
      if (constants.transports[transport]) {
        transports.push(new winston.transports[transport](transportValue))
      }
    })
    let format = winston.format
    this.logger = winston.createLogger({
      transports: transports,
      format: winston.format.combine(format.label({'label': this.options.label}),
        this.appendTimestamp({ tz: this.options.tz || constants.defaultTimeZone }), format.prettyPrint())
    })
  }

  appendTimestamp (timeZone) {
    return winston.format((info, opts) => {
      if (opts.tz) {
        info.timestamp = moment().tz(opts.tz).format()
      }
      return info
    })
  }

  clear () {
    this.logger.clear()
  }
  remove () {
    this.logger.remove()
  }
  add (options) {
    this.logger.add(options)
  }
  log (options) {
    this.logger.log(options)
  }
  setFormat () {
    this.customFormat = winston.format.printf(info => {
      return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
    })
  }
}
// createlogger paramaeter foemat
// {
//     transports:{
//         console : {

//         },
//         file:{

//         },

//     }
//     timezone : timezone

// }

module.exports = LoggerService
