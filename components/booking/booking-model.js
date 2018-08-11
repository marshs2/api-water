let mockCanData = {
  canOptions: [{
    quantity: 10,
    defaultNumber: 3,
    unit: 'litres'
  },
  {
    quantity: 25,
    defaultNumber: 2,
    unit: 'litres'
  }
  ],
  defaultCanOption: {
    quantity: '25',
    unit: 'litres',
    defaultNumber: 2
  },
  emergencyBooking: false,
  upperBound: 10,
  lowerBound: 1
}
let BookingService = require('./booking-service')
let bookingService
class BookingModel {
  constructor (options) {
    bookingService = new BookingService(options)
    this.options = options
  }
  getCanData (request, response) {
    response.json(mockCanData)
    // bookingService.getInitialCanData().then(res => {
    //   response.json(res.rows[0])
    //   bookingService.disConnect()
    // }).catch(e => console.error(e.stack))
  }
}

module.exports = BookingModel
