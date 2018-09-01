/* This index.js module takes up middle ware object and other configuartion object and passes it to component api.
   This Module accepts middle ware and other configuation object from root index.js script
   Any Api specific Dependencies can be injected here which is available in libs and services.
   Only web layer logic presents here and context object preparation based on requested resource goes here
   Because passing express to Bussiness Logic breaks the testing of bussiness logic code.
*/
const path = require('path')
let SignUpLoginRoutes = require(path.join(__dirname, 'signup-login-routes.js'))
let signupLoginRoutes

let apiPrefix = '/api/v1'

function init (options) {
  signupLoginRoutes = new SignUpLoginRoutes(options)
  signupLoginRoutes.initRoutes()
  options.app.use(apiPrefix, signupLoginRoutes.getRouter())
}

module.exports = init
