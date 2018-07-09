let express = require('express')
let app = express()
class Server {
  constructor (options) {
    this.options = options
  }
  initServer (config) {
    let server
    let promise = new Promise((resolve, reject) => {
      try {
        server = app.listen(config.port, () => {
          resolve({status: 'running', port: config.port, server: server, express: express, app: app})
        })
      } catch (error) {
        reject(error)
      }
    })
    return promise
  }

  getExpress () {
    return express
  }
  getApp () {
    return app
  }
}
module.exports = Server
