/**
 * Middle Ware Logger service utilty is used to log error in middleware.
 * Express is used as a middleware service
 */
let LoggerService = require('../logger-service/logger-service')
class MiddleWareLoggerService {
  /**
     * @description construct with config options object for middle ware
     * @param {*} options {{level:info|errors|warn|one of the log level of winston logger}}
     */
  constructor (options) {
    this.options = options
    this.logger = new LoggerService(options)
  }
  /**
   * @description express error handler used for handling middle ware error (express) call like errorHandler({callback:handler})
   * @description If callback is undefined default callback will be handle with log.
   * @param {*} options {{callback:middleware error callback}}
   */
  errorHandler (options) {
    var self = this
    return (options && options.callback) || function (err, req, res, next) {
      if (!self.options.disable) {
        self.logger.log({level: options.level, message: typeof err === 'object' ? JSON.stringify(err) : err})
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
