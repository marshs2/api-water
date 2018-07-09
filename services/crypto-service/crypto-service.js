/* This Crypto Service is used for data encryption,decryption and encryption decryption with salt.
   Used for hashing senstive data like password
 */
let crypto = require('crypto')
let singleton = Symbol('singleton')
let bcrypt = require('bcryptjs')
class CryptoService {
  constructor (token) {
    if (token !== singleton) {
      throw new Error('Cannot instantiate singleton class use classname.instance instead')
    }
    this.init()
  }
  static get instance () {
    if (!this[singleton]) {
      this[singleton] = new CryptoService(singleton)
    }
    return this[singleton]
  }
  init () {
    this.algorithm = 'aes-256-ctr'
    this.encodingType = 'utf8'
    this.cryptoType = 'hex'
  }
  hashSalt (input, salt) {
    return bcrypt.hashSync(input, salt || 8)
  }
  hashSaltCompare (input, hash) {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(input, hash, function (err, success) {
        if (err) {
          reject(new Error('mismatch'))
        } else {
          resolve({
            sucess: true
          })
        }
      })
    })
  }
  setSecret (secret) {
    this.secret = secret
    return this
  }
  encrypt (text) {
    if (this.secret) {
      throw new Error('please set secret key before. use setSecret() method to set.')
    }
    let cipher = crypto.createCipher(this.algorithm, this.secret)
    let crypted = cipher.update(text, this.encodingType, this.cryptoType)
    crypted += cipher.final(this.cryptoType)
    return crypted
  }
  decrypt (text) {
    if (this.secret) {
      throw new Error('please set secret key before using setSecret method')
    }
    let decipher = crypto.createDecipher(this.algorithm, this.secret)
    let dec = decipher.update(text, this.encodingType, this.encryptType)
    dec += decipher.final(this.cryptoType)
    return dec
  }
}
module.exports = CryptoService
