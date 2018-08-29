var LoggerService = require('./logger-service')
var options = {
  transports: {
    file: [{
      level: 'info',
      filename: 'newinfo1.log'
    }, {
      level: 'error',
      filename: 'newerror1.log'
    }]
  },
  isDailyRotate: true

}
var loggerService = new LoggerService(options)
loggerService.log({level: 'info', message: '1hello'})
loggerService.log({level: 'error', message: '1hello'})
