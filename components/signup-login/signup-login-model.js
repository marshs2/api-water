/*
    This model file contains all sign up related bussiness logic and data access layer stuffs (DAL).
    This can be used for routes handler.
*/
class SignUpLoginModel {
  constructor (options) {
    this.options = options
  }
  checkUserExists () {}
  sendOTP () {}
  validateAccessToken () {}
  updateUserData () {}
  validateGoogle () {
    return new Promise(function (resolve, reject) {
      resolve({sucess: true})
    })
  }
}
module.exports = SignUpLoginModel
