// TODO REMOVE WHEN FIXED
// necessary workarounds for winston 3.0.0-rc1..
// node query-log.js | grep dude
require('./winston-workaround')
const winston = require('winston')
const path = require('path')
var logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logging-results', '9-2018', 'api-water-info.log-9-18-2018'), // '../logging-results/9-2018/api-water-info.log-9-18-2018',
      timestamp: true
    })
  ]
})
const options = {
  // from: new Date() - (24 * 60 * 60 * 1000),
  // until: new Date(),
  // limit: 10,
  // start: 0,
  // order: 'desc',
  format: winston.format.json(),
  fields: ['message']
}
logger.query(options, function (err, results) {
  if (err) {
    /* TODO: handle me */
    throw err
  }
  console.log(results.file)
})
