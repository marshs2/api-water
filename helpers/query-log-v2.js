let LoggerService = require('../services/logger-service/logger-service')
const winston = require('winston')
const path = require('path')
const options = {
  // from: new Date() - (24 * 60 * 60 * 1000),
  // until: new Date(),
  // limit: 10,
  // start: 0,
  // order: 'desc',
  format: winston.format.json(),
  fields: ['message'],
  transports: {
    file: [{
      filename: path.join(__dirname, '..', 'logging-results', '9-2018', 'api-water-info.log-9-18-2018'),
      timestamp: true
    }]
  }
}

let loggerService = new LoggerService(options)
loggerService.query(options, (err, res) => {
  if (err) {
    throw err
  }
  console.log('results %j', res)
})
