/*
    This model file contains all sign up related bussiness logic and data access layer stuffs (DAL).
    This can be used for routes handler.
*/
class SignUpLoginModel {
  constructor (options) {
    this.options = options
    // console.log('signup-login model', options.express)
  }
  setHeader (response) {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE') // If needed
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type') // If needed
    response.setHeader('Access-Control-Allow-Credentials', true) // If needed
  }
  checkUserExists () {}
  sendOTP () {}
  validateAccessToken () {}
  updateUserData () {}
  handler (request, response) {
    response.send('hello')
  }

  validatePhone (request, response) {
    this.setHeader(response)
    response.send({sucess: true})
  }
}
module.exports = SignUpLoginModel
