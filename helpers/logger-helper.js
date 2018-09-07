var LoggerService = require('../services/logger-service/logger-service')
var options = {
  transports: {
    file: [{
      level: 'info',
      filename: '../logging-results/info.log'

    }, {
      level: 'error',
      filename: '../logging-results/error.log'
    }]
  },
  isDailyRotate: true

}
var loggerService = new LoggerService(options)
loggerService.log({level: 'info', message: '1hello'})
loggerService.log({level: 'error', message: '1hello'})
