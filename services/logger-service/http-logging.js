const winston = require('winston')
let options = {
  filename: 'http.log'

}
winston.createLogger({
  transports: new winston.transports.Http(options)
})
