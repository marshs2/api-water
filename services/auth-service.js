let jwt = require('jsonwebtoken')
let fs = require('fs')
let singleton = Symbol('singleton')
class AuthService {
  constructor (token) {
    if (token !== singleton) {
      throw new Error('Cannot instantiate singleton class use classname.instance instead')
    }
    this.init()
  }
  init () {

  }
  sign (options) {
    return new Promise(function (resolve, reject) {
      if (!options.data) {
        reject(new Error('payload is empty.'))
      }
      if (options.secret) {
        reject(new Error('secret is empty'))
      }
      if ((options.private_key && !options.algorithm) ||
        (!options['private_key'] && options['algorithm'])) {
        reject(new Error('algorithm and private key both must be present'))
      } else if (options.algorithm != 'RS256') {
        reject(new Error('Unknown algorithm .RS256 supported'))
      }
      if (options.private_key) {
        let cert = fs.readFileSync(options.private_key)
        resolve(jwt.sign(options.data, cert, {
          algorithm: options.algorithm
        }))
      }
    })
  }
}
module.exports = AuthService
