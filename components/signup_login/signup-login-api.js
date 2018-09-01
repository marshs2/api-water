let SignUpLoginModel = require('./signup-login-model.js')
const _ = require('lodash')
const defaultHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
  'Access-Control-Allow-Credentials': true
}
class SignUpLoginAPI extends SignUpLoginModel {
  constructor (options) {
    super(options)
    this.options = options
  }
  validateGoogle (request, response, next) {
    this.setHeader(response, defaultHeaders)
    super.validateGoogle().then(data => {
      response.send(data)
      return next()
    }).catch(error => {
      return next(error)
    })
  }
  setHeader (response, headers) {
    _.forEach(headers, (headerValue, headerKey) => {
      response.setHeader(headerKey, headerValue)
    })
    // response.setHeader('Access-Control-Allow-Origin', '*')
    // response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE') // If needed
    // response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type') // If needed
    // response.setHeader('Access-Control-Allow-Credentials', true) // If needed
  }
}
module.exports = SignUpLoginAPI
