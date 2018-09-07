/* Booking Routes Service Provides router deinition and exposing express callback to weblayer(API) of booking model(BookingAPI) */
let RouterService = require('../../services/router-service/router-service')
let routerService = new RouterService()
let bookingAPI
const ERRORS = require('./errors')
let BookingAPI = require('./booking-api')
class BookingRoutes {
  constructor (options) {
    this.options = options
    bookingAPI = new BookingAPI(options)
  }
  /**
   * @description This method is used to add endpoints to all booking model components
   */
  initRoutes () {
    try {
      routerService.addRouter({path: '/cans', method: 'get', callback: bookingAPI.getCanData.bind(bookingAPI)})
    } catch (error) {
      throw new Error(ERRORS.ROUTER_INIT_ERROR)
    }
  }
  /**
   * @description returns Registered Routes of booking module
   * @param {null}
   * @return {express registered router}
   */
  getRouter () {
    return routerService.getRouter()
  }
}

module.exports = BookingRoutes
