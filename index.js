/*
    This is an Start up script
    Responsible for passing server,db and other configuration objects to the respective components.
    It imports middle ware framework like expressjs,hapi any required libraries needed for it.
    Complie with new ecma script
*/
let express = require('express')
let requireGlob = require('require-glob')
let componentRoutes = requireGlob('./components/**/index.js')
let _ = require('lodash')
let configuaration = {}
let ConfiguarationManger = require('./services/configuaration')
let app = express()
let server
const configPath = './config/config.json'

function initComponentRoutes (options) {
  let promise = new Promise((resolve, reject) => {
    componentRoutes.then((data) => {
      _.forEach(data, function (value, key) {
        data[key].index(options)
      })
      resolve({
        sucess: 'sucess',
        scope: 'componentRoutesInit'
      })
    }).catch((error) => {
      reject(error)
    })
  })
  return promise
}

function initConfiguaration (path) {
  let configManager = new ConfiguarationManger({
    filePath: path
  })
  configManager.init()
  let promise = configManager.save()

  return promise
}

function initServer () {
  let port
  let promise = new Promise((resolve, reject) => {
    try {
      port = configuaration.config_scope.getConfig('PORT') ||
      configuaration.config_scope.getConfig('server:default_port')
      server = app.listen(port, () => {
        console.log('server running on ', port)
        resolve({status: 'running', port: port})
      })
    } catch (error) {
      reject(error)
    }
  })
  return promise
}

async function init () {
  let config

  try {
    _.assign(configuaration, {
      express: express,
      app: app
    })
    config = await initConfiguaration(configPath)
    _.assign(configuaration, {
      config: config.data,
      config_scope: config.scope
    })
    await initServer()
    await initComponentRoutes(configuaration)
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
  server.close((err) => {
    if (err) {
      console.log('Exit Error', err)
      process.exit(1)
    }
  })
})
process.on('message', (msg) => {
  if (msg === 'shutdown') {
    console.log('Closing all connections...')
    setTimeout(() => {
      console.log('Finished closing connections')
      process.exit(0)
    }, 1500)
  }
})
