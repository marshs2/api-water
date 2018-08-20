let path = require('path')
let RouterService = require('../../services/router-service/router-service')
let routerService = new RouterService()
let BookingModel = require(path.join(__dirname, 'booking-model.js'))
let bookingModel
const ERRORS = require('./errors')

class BookingRoutes {
  constructor (options) {
    this.options = options
    bookingModel = new BookingModel(options)
  }
  initRoutes () {
    try {
      routerService.addRouter({path: '/cans', method: 'get', callback: bookingModel.getCanData.bind(bookingModel)})
    } catch (error) {
      throw new Error(ERRORS.ROUTER_INIT_ERROR)
    }
  }
  getRouter () {
    return routerService.getRouter()
  }
}

module.exports = BookingRoutes
