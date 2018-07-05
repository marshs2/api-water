/*
 Router services contains ExpressJs router settings,middleware Wrapper and other dependencies injection.
 It can be injected by other components for middle ware router definition.
 */
'use strict'
const _ = require('lodash')
let express = require('express')
let router = express.Router()
/*
options contains config related information
*/
class RouterService {
  constructor (options) {
    this.options = options
  }

  /** @description Adds middleware functionality
 * @param {} {Object} { path :'path_to_middleware' , callback : 'your_callback or thirdParty_middleware' }
 * @return {null}
 */
  addMiddleWare (middleware) {
    if (_.get(middleware, 'path') && _.get(middleware, 'callback')) {
      router.use(middleware.path, middleware.callback)
    } else if (_.get(middleware, 'callback')) {
      router.use(middleware.callback)
    }
  }
  /** @description Returns the router
 *
 * @return {} {router}
 */
  getRouter () {
    return router
  }

  /** @description Adds api routes and handler
 * @param {} {Object} { path :'path_to_route' , callback : 'your_route_callback' }
 * @return {null}
 */
  addRouter (routerConfig) {
    if (_.get(routerConfig, 'path') && _.get(routerConfig, 'callback')) {
      router.use(routerConfig.path, routerConfig.callback)
    } else if (_.get(routerConfig, 'callback')) {
      router.use(routerConfig.callback)
    }
  }
}
module.exports = RouterService
