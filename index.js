/*
    This is an Start up script
    Responsible for passing server,db and other configuration objects to the respective components.
    It imports middle ware framework like expressjs any required libraries needed for it.
    Complie with new ecma script
*/
let requireGlob = require('require-glob')
let componentRoutes = requireGlob('./components/**/index.js')
let _ = require('lodash')
let configuaration = {}
let ConfiguarationManger = require('./services/configuaration-service/configuaration-service')
const configPath = './config/config.json'
let RouteBootstrap = require('./services/route-bootstrap/route-bootstrap-service')
let bootstrapRoute = new RouteBootstrap()
let Server = require('./services/server/server-service')
let server = new Server()
let serverConfig
let MWLoggerService = require('./services/mw-logger-service/mw-logger-service')
let mwLoggerService

_.assign(configuaration, {
  componentRoutes: componentRoutes
})

function initConfiguaration (path) {
  let configManager = new ConfiguarationManger({
    filePath: path
  })
  configManager.init()
  let promise = configManager.save()

  return promise
}

async function init () {
  let config

  try {
    config = await initConfiguaration(configPath)
    mwLoggerService = new MWLoggerService(config.data.logger)
    _.assign(configuaration, {
      config: config.data,
      config_scope: config.scope
    })
    serverConfig = await server.initServer({
      port: configuaration.config_scope.getConfig('PORT') ||
        configuaration.config_scope.getConfig('server:default_port')
    })
    server = serverConfig.server
    _.assign(configuaration, {
      express: serverConfig.express,
      app: serverConfig.app
    })
    serverConfig.app.use(mwLoggerService.errorHandler())
    await bootstrapRoute.initComponentRoutes(configuaration)
  } catch (error) {
    console.log(error)
  }
}

init()

/* Graceful Shutdown During pm2 stop command this event will trigger.
   Server close will finish ongoing process wothout abrupt stop.
   DB connection close and resource release can be performed here.
 */
process.on('SIGINT', () => {
  console.info('SIG INT RECEIVED')
  try {
    if (server._handle != null) {
      server.close((err) => {
        if (err) {
          console.log('Exit Error', err)
          process.exit(1)
        }
      })
    }
  } catch (e) {
    console.error(e)
  }
})
process.on('message', (msg) => {
  try {
    if (msg === 'shutdown') {
      console.log('Closing all connections...')
      setTimeout(() => {
        console.log('Finished closing connections')
        process.exit(0)
      }, 1500)
    }
  } catch (e) {
    console.error(e)
  }
})
