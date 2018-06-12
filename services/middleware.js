/*
 Middle ware services contains ExpressJs port settings,createServer Wrapper and other dependencies injection.
 It can be injected by other components for middle ware related stuff.
 initServer(options) returns server.
 getServer();
 */
'use strict'
const hapi = require('hapi')

class MiddleWare {
  constructor (options) {
    this.server = hapi.server({
      port: options.port,
      host: options.host
    })
  }
  registerRoute (config) {
    this.server.route(config)
  }
  async startServer () {
    await this.server.start()
    console.log(`Server running on port : $(this.server.info.uri)`)
  }
}
module.exports = MiddleWare
