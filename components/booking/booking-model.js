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
let _ = require('lodash')
let BookingService = require('./booking-service')
let bookingService
class BookingModel {
  constructor (options) {
    bookingService = new BookingService(options)
    this.options = options
  }
  getCanData (request, response) {
    // response.json(mockCanData)

    bookingService.getInitialCanData().then(res => {
      let defaultCanOptions = _.filter(res.rows, function (o) { return o.is_default })
      response.json({canOptions: res.rows,
        defaultCanOption: defaultCanOptions,
        emergencyBooking: false,
        upperBound: 10,
        lowerBound: 1 })
      bookingService.disConnect()
    }).catch(e => {
      console.error(e.stack)
      bookingService.disConnect()
    })
  }
}

module.exports = BookingModel
