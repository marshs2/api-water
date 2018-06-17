/*
    This model file contains all sign up related bussiness logic and data access layer stuffs (DAL).
    This can be used for routes handler.
*/
class SignUpLoginModel {
  constructor (options) {
    this.options = options
    console.log('signup-login model', options.express)
  }
  checkUserExists () {}
  sendOTP () {}
  validateAccessToken () {}
  updateUserData () {}
  handler (request, response) {
    response.send('hello')
  }
}
module.exports = SignUpLoginModel
