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
      app.listen(port, () => {
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
