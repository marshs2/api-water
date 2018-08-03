let path = require('path')
let BookingRoutes = require(path.join(__dirname, 'booking-routes.js'))
let bookingRoutes
let apiPrefix = '/api/v1'
function init (options) {
  bookingRoutes = new BookingRoutes(options)
  bookingRoutes.initRoutes()
  options.app.use(apiPrefix, bookingRoutes.getRouter())
}

module.exports = init
