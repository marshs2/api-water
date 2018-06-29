/*  This is a route script defines all routes and connect to model
*/
let path = require('path')
let RouterService = require('../../services/router-service')
let routerService = new RouterService()
let SignUpLoginModel = require(path.join(__dirname, 'signup-login-model.js'))
let signupLogin = new SignUpLoginModel()
class SignUpRoutes {
  constructor (options) {
    this.options = options
  }
  initRoutes () {
    try {
      routerService.addRouter({path: '/signup_google', callback: signupLogin.validateGoogle.bind(signupLogin)})
    } catch (error) {
      console.log('Router init error -> context -> SignUpRoutes')
    }
  }
  getRouter () {
    return routerService.getRouter()
  }
}

module.exports = SignUpRoutes
