let path = require('path')
let RouterService = require('../../services/router-service/router-service')
let routerService = new RouterService()
let BookingModel = require(path.join(__dirname, 'booking-model.js'))
let bookingModel = new BookingModel()

class BookingRoutes {
  constructor (options) {
    this.options = options
  }
  initRoutes () {
    try {
      routerService.addRouter({path: '/getCan', callback: bookingModel.getCanData.bind(bookingModel)})
    } catch (error) {
      console.log('Router init error -> context -> SignUpRoutes')
    }
  }
  getRouter () {
    return routerService.getRouter()
  }
}

module.exports = BookingRoutes
