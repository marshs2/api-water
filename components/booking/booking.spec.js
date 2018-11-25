/* global define, it, describe */
const expect = require('chai').expect
const config = require('../../ecosystem.config')
const BookingModel = require('./booking-model')
const bookingModel = new BookingModel({
  db: config.apps[0].env_development
})
const constants = require('./booking-constants')

describe('Booking Component Api tests', () => {
  it('should check default booking options are correct', async () => {
    let bookingData = await bookingModel.getCanData()
    expect(bookingData.upper_bound, 'default can upper bound test fails').to.equal(constants.UPPER_BOUND)
    expect(bookingData.lower_bound, 'default can lower bound test fails').to.equal(constants.LOWER_BOUND)
    expect(bookingData.emergency_booking, 'default emergency booking state test fails').to.equal(constants.DEFAULT_EMERGENCY_BOOKING)
    expect(bookingData.can_options.length, 'can_options test fails').to.equal(2)
    expect(bookingData.default_can_option.default_value, 'default can quantity test fails').to.equal(2)
  })
})
