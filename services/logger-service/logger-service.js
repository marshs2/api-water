/* This is Logger Service utility to log errors,info,warn like levels.
    Provides different transports for level. Built on top of the winston logger.
    Please refer npm winston logger for more detail
    https://www.npmjs.com/package/winston
 */
let winston = require('winston')
let moment = require('moment-timezone')
let _ = require('lodash')
let constants = require('./logger-constants')

class LoggerService {
  /** @description Adds options for different level of logging
 * @param {} {Object} { transports: {
    file: [{
      level: 'info',
      filename: 'your_info_file_path.log'
    }, {
      level: 'error',
      filename: 'your_error_file_path.log'
    }]
  },
  isDailyRotate: true

}
 * @return {null}
 */
  constructor (options) {
    this.options = options
    this.createLogger()
  }
  createLogger () {
    let transports = []
    let currentTransport
    let self = this
    _.forEach(this.options.transports, function (transportValue, transport) {
      currentTransport = constants.transports[transport]
      _.forEach(self.options.transports[transport], function (currentTransportOptions) {
        self.updateFileonDailyRotate(currentTransportOptions)
        transports.push(new winston.transports[currentTransport](currentTransportOptions))
      })
    })
    this.logger = winston.createLogger({
      transports: transports,
      format: winston.format.combine(winston.format.label({'label': this.options.label || 'default label'}),
        this.appendTimestamp({ tz: this.options.tz || constants.defaultTimeZone }), winston.format.prettyPrint())
    })
  }
  /** @description updateFilename suffixed with date format like mm-yy-dddd
 *
 * @param {*} transportOpts {filename:'filename'}
 */
  updateFileonDailyRotate (transportOpts) {
    let d = new Date()
    let mm = d.getMonth() + 1
    let dd = d.getDate()
    let yyyy = d.getFullYear()
    if (this.options.isDailyRotate && transportOpts.filename) {
      transportOpts.filename = transportOpts.filename + '-' + mm + '-' + dd + '-' + yyyy
    }
  }
  /** @description This function appends time stamp with specified timezone into logs.Default timezone is Asia/Kolkata
   *
   * @param {*} options {tz:'your_timezone like Asia/Kolkata'}
   */
  appendTimestamp (options) {
    let format = winston.format((info, opts) => {
      if (opts.tz) {
        info.timestamp = moment().tz(opts.tz).format()
      }
      return info
    })
    return format(options)
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

module.exports = LoggerService
