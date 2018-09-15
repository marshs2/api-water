let singleton = Symbol('singleton')
const CONSTANTS = require('./constants')
const LOGGER_LEVELS = require('../logger-service/logger-constants').levels
class ErrorHandler {
  constructor (token) {
    if (token !== singleton) {
      throw new Error('Singleton Cannot initaite the class')
    }
  }
  static get instance () {
    if (!this[singleton]) {
      this[singleton] = new ErrorHandler(singleton)
    }
    return this[singleton]
  }
  /**
   * @description constructs common error object and stringfy the error object
   * @param {option} {data:{your error object} , severity : HIGH|LOW|MEDIUM }
   */
  sendError (options) {
    return JSON.stringify(options)
  }
  getSeverity () {
    return CONSTANTS.SEVERITY
  }
  getLoggerLevel () {
    return LOGGER_LEVELS
  }
}
module.exports = ErrorHandler
