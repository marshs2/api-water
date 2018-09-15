/**
 * Middle Ware Logger service utilty is used to log error in middleware.
 * Express is used as a middleware service
 */
let LoggerService = require('../logger-service/logger-service')
class MiddleWareLoggerService {
  /**
     * @description construct with config options object for middle ware
     * @param {*} options {please refer winston logger options params}
     */
  constructor (options) {
    this.options = options
    this.logger = new LoggerService(options)
  }
  /**
   * @description express error handler used for handling middle ware error (express)
   * @description If callback is undefined default callback will be handled which to log.
   * @description It logs errors to external file , mail to admin , any XYZ functionality needed in future.
   * @param {*} options {{callback:middleware error callback}}
   */
  errorHandler (options) {
    var self = this
    return (options && options.callback) || function (err, req, res, next) {
      if (self.options && !self.options.disable) {
        self.logger.log({level: options.level, message: typeof err === 'object' ? typeof err + '~' + err.message : err})
        // self.logger.log({level: options.level, message: typeof err})
      }
      next(err)
    }
  }
  /**
   * @description Disables Log writing to files
   */
  disableLog () {
    this.options.disable = true
  }
  /**
   * Enables Log Writing to file
   */
  enableLog () {
    this.options.disable = false
  }
}

module.exports = MiddleWareLoggerService
