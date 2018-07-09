let _ = require('lodash')

class RouteBootstrap {
  constructor (options) {
    this.options = options
  }
  initComponentRoutes (options) {
    let promise = new Promise((resolve, reject) => {
      options.componentRoutes.then((data) => {
        _.forEach(data, function (value, key) {
          data[key].index(options)
        })
        resolve({
          status: 'sucess',
          scope: 'componentRoutesInit'
        })
      }).catch((error) => {
        reject(error)
      })
    })
    return promise
  }
}
module.exports = RouteBootstrap
