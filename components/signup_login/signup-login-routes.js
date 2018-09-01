/*  This is a route script defines all routes and connect to model
*/
let path = require('path')
let RouterService = require('../../services/router-service/router-service')
let routerService = new RouterService()
let SignupLoginApi = require(path.join(__dirname, 'signup-login-api.js'))
let signupLoginApi = new SignupLoginApi()
class SignUpRoutes {
  constructor (options) {
    this.options = options
  }
  initRoutes () {
    try {
      routerService.addRouter({path: '/signup_google', method: 'get', callback: signupLoginApi.validateGoogle.bind(signupLoginApi)})
    } catch (error) {
      console.log('Router init error -> context -> SignUpRoutes')
    }
  }
  getRouter () {
    return routerService.getRouter()
  }
}

module.exports = SignUpRoutes
