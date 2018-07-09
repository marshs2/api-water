let jwt = require('jsonwebtoken')
let fs = require('fs')
let singleton = Symbol('singleton')
const AUTH_EXCEPTION = require('./auth-errors')
const CONSTANTS = require('./auth-constants')
let _ = require('lodash')
class AuthService {
  constructor (token) {
    if (token !== singleton) {
      throw new Error(AUTH_EXCEPTION.SINGLETON_ERROR)
    }
    this.init()
  }
  init () {

  }
  static get instance () {
    if (!this[singleton]) {
      this[singleton] = new AuthService(singleton)
    }
    return this[singleton]
  }
  sign (options) {
    return new Promise(function (resolve, reject) {
      if (!options.data) {
        reject(new Error(AUTH_EXCEPTION.PAYLOAD_EMPTY))
      }
      if (!options.secret) {
        reject(new Error(AUTH_EXCEPTION.SECRET_EMPTY))
      }
      if ((options.private_key && !options.algorithm) ||
        (!options.private_key && options.algorithm)) {
        reject(new Error(AUTH_EXCEPTION.ALGORITM_OR_KEY_MISSING))
      } else if (_.includes(CONSTANTS.ALGORITHM, options.algorithm)) {
        reject(new Error(AUTH_EXCEPTION.UNKNOWN_ALGORITHM + options.algorithm))
      }
      if (options.private_key) {
        let cert = fs.readFileSync(options.private_key)
        resolve(jwt.sign(options.data, cert, {
          algorithm: options.algorithm
        }))
      } else {
        resolve(jwt.sign(options.data, options.secret))
      }
    })
  }
}

// AuthService.instance.sign({
//   data: {
//     foo: 'bar'
//   },
//   secret: 'secret'
// }).then(function (data) {
//   console.log('data', data)
// }).catch(function (error) {
//   console.log(error)
// })
module.exports = AuthService
