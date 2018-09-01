/* Booking Model class provides bussiness logic for booking model. */
let BookingService = require('./booking-service')
let bookingService
class BookingModel {
  constructor (options) {
    bookingService = new BookingService(options)
    this.options = options
  }
  getCanData () {
    return bookingService.getInitialCanData()
  }
}

module.exports = BookingModel
