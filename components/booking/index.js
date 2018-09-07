/**
 /*
 Booking Model root script for bootstraping booking components routes with bussiness logic
 */
let path = require('path')
let BookingRoutes = require(path.join(__dirname, 'booking-routes.js'))
let bookingRoutes
let apiPrefix = '/api/v1'
/**
 * @description Booking Model root script for registering routes with component bussiness logic , Web Layer Interface and Data Access Layer
 * @param {*} options {}
 */
function init (options) {
  bookingRoutes = new BookingRoutes(options)
  bookingRoutes.initRoutes()
  options.app.use(apiPrefix, bookingRoutes.getRouter())
}

module.exports = init
