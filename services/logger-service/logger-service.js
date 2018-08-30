/* This is Logger Service utility to log errors,info,warn like levels.
    Provides different transports for level. Built on top of the winston logger.
    Please refer npm winston logger for more detail
    https://www.npmjs.com/package/winston
 */

// import './winston-workaround'
const winston = require('winston')
const moment = require('moment-timezone')
const _ = require('lodash')
const constants = require('./logger-constants')
const fs = require('fs')
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

  /** @description this function is used to create logger of different transports at different level
   *
   */
  createLogger () {
    let transports = []
    let currentTransport
    let self = this
    winston.addColors(constants.colors)
    _.forEach(this.options.transports, function (transportValue, transport) {
      currentTransport = constants.transports[transport]
      _.forEach(self.options.transports[transport], function (currentTransportOptions) {
        self.updateFileonDailyRotate(currentTransportOptions)
        transports.push(new winston.transports[currentTransport](currentTransportOptions))
      })
    })
    this.logger = winston.createLogger({
      transports: transports,
      levels: constants.levels,
      format: winston.format.combine(winston.format.colorize(), winston.format.label({'label': this.options.label || 'default label'}),
        this.appendTimestamp({ tz: this.options.tz || constants.defaultTimeZone }), winston.format.prettyPrint())
    })
  }
  /** @description updateFilename suffixed with date format like mm-yy-dddd and it create folder in mm-yyyy folder and place your file month wise
 *
 * @param {*} transportOpts {filename:'filename'}
 */
  updateFileonDailyRotate (transportOpts) {
    let d = new Date()
    let mm = d.getMonth() + 1
    let dd = d.getDate()
    let yyyy = d.getFullYear()
    let pathToFile, pathToFileLength
    let logFolder = mm + '-' + yyyy
    let dir

    if (this.options.isDailyRotate && transportOpts.filename) {
      pathToFile = transportOpts.filename.split('/')
      pathToFileLength = pathToFile.length
      if (pathToFileLength > 1) {
        dir = pathToFile.slice(0, pathToFileLength - 1).join('/') + '/' + logFolder + '/'
        this.createDirectoryNotExists(dir)
        transportOpts.filename = dir + pathToFile[pathToFileLength - 1] + '-' + mm + '-' + dd + '-' + yyyy
      } else {
        dir = './' + logFolder + '/'
        this.createDirectoryNotExists(dir)
        transportOpts.filename = dir + transportOpts.filename + '-' + mm + '-' + dd + '-' + yyyy
      }
    }
  }

  createDirectoryNotExists (dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    } else {
      console.log(dir + ' Directory already exist')
    }
  }
  /** @description This function appends time stamp with specified timezone into logs. Default timezone is Asia/Kolkata
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
  /**
 * clear all logger which created already
 *
 */
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
  // not working bugs in winstpon library itself //
  // query (options, callback) {
  //   // this.logger.query(options, callback)
  //   winston.query(options, callback)
  // }
  setFormat () {
    this.customFormat = winston.format.printf(info => {
      return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
    })
  }
  addErrorEvent (callback) {
    this.logger.on('error', callback)
  }
}

module.exports = LoggerService
