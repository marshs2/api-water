/* Configuration Wrapper Class for managing hierachcal configuaration using nconf
Reference https://www.npmjs.com/package/nconf
*/
const fs = require('fs')
const nconf = require('nconf')
const _ = require('lodash')

class ConfiguarationManger {
  constructor (options) {
    this.options = options
  }
  setConfig (key, value) {
    nconf.set(key, value)
  }
  getConfig (key) {
    return nconf.get(key)
  }
  init () {
    nconf.argv()
      .env()
      .file({
        file: this.options.filePath
      })
  }
  save () {
    let self = this

    return new Promise(function (resolve, reject) {
      nconf.save(function (err) {
        if (err) { reject(err) }
        fs.readFile(self.options.filePath, function (err, data) {
          if (err) { reject(err) }
          resolve(_.assign({}, {data: JSON.parse(data.toString()), scope: self}))
        })
      })
    })
  }
}

module.exports = ConfiguarationManger
