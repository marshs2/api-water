/* Agency API class is just an interface for Business Logic. Primarly Used for preparing context object for model class rather directly passing express object as it restricts the testabilty.
    For Additional Reference why interface layer need Please Refer the link
    https://github.com/i0natan/nodebestpractices/blob/master/sections/projectstructre/createlayers.md
    Example : if you want to pluck any data by id: prepare context object from request and pass context object to model class. so it can be unit tested
    userContextobject : {
        userId : req.id
    }
*/
let AgencyModel = require('./agency-model')
const ErrorHandler = require('../../services/error-handler/error-handler')
const errorHandler = ErrorHandler.instance
const _ = require('lodash')
const HTTP_RESPONSE = require('../../globals/http-response')
const AGENCY_ERRORS = require('./agency-errors')
class AgencyAPI extends AgencyModel {
  constructor (options) {
    super(options)
    this.options = options
  }
  /**
   * @description Agency model web layer handler for getting nearby agency list
   * @param {*} request
   * @param {*} response
   * @param {*} next
   */
  getNearByAgency (request, response, next) {
    let self = this
    let constraints = self.getNearByAgencyRequestConstraints(request.query)
    if (_.isObject(constraints)) {
      return response.json(constraints)
    }
    super.getNearByAgency(request.query).then(data => {
      response.json(data)
      // self.alwaysThrowError(request)
    }).catch(function (err) {
      next(err)
    })
  }

  getNearByAgencyRequestConstraints (queryParams) {
    if (!_.has(queryParams, 'lat') || !_.has(queryParams, 'long')) {
      return {
        status: HTTP_RESPONSE.STATUS.FAIL,
        reason_code: HTTP_RESPONSE.BAD_REQUEST.CODE,
        message: AGENCY_ERRORS.LAT_LONG_INPUT_MISSING.MESSAGE
      }
    }
    return true
  }

  /**
   * Dummy Error Function to test error logging in middleware function will remove later
   */
  alwaysThrowError (request) {
    let errorData = {
      data: {'hi': 'error'},
      severity: errorHandler.getSeverity().HIGH,
      level: errorHandler.getLoggerLevel.info,
      isOperational: false,
      route: request.originalUrl
    }
    throw new Error(errorHandler.sendError(errorData))
    // throw new Error(errorData)
  }
}
module.exports = AgencyAPI
