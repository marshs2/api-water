/*
 Middle ware services contains ExpressJs port settings,createServer Wrapper and other dependencies injection.
 It can be injected by other components for middle ware related stuff.
 initServer(options) returns server.
 getServer();
 */
'use strict'
const express = require('express')
const app = express()
const _ = require('lodash')
/*
options contains config related information
*/
class MiddleWare {
  constructor (options) {
    if (!MiddleWare.instance) {
      this.options = options
      MiddleWare.instance = this
    }
    return MiddleWare.instance
  }
  registerRoute () {

  }
  getRouter () {
    return express.Router()
  }
  getApp () {
    return app
  }
  addMiddleWare (middleware) {
    if (_.get(middleware, 'path') && _.get(middleware, 'callback')) {
      app.use(middleware.path, middleware.callback)
    } else if (_.get(middleware, 'callback')) {
      app.use(middleware.callback)
    }
  }
}
const instance = new MiddleWare()
Object.freeze(instance)
module.exports = instance
