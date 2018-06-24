/* This index.js module takes up middle ware object and other configuartion object and passes it to component api.
   This Module accepts middle ware and other configuation object from root index.js script
   Any Api specific Dependencies can be injected here which is available in libs and services.
   Only web layer logic presents here and context object preparation based on requested resource goes here
   Because passing express to Bussiness Logic breaks the testing of bussiness logic code.
*/

const path = require('path')
let SignUpLoginModel = require(path.join(__dirname, 'signup-login-model.js'))
let signupLogin
let apiPrefix = '/api/v1/'
function init (options) {
  signupLogin = new SignUpLoginModel(options)
  options.app.get(apiPrefix + 'signup_login_phone', (req, res) => signupLogin.validatePhone(req, res))
}

module.exports = init
