let mockCanData = {
  canOptions: [{
    type: 10,
    defaultNumber: 3,
    units: 'litres'
  },
  {
    type: 10,
    defaultNumber: 3,
    units: 'litres'
  }
  ],
  defaultOption: {
    type: '25',
    units: 'litres',
    defaultNumber: 2
  }
}
class BookingModel {
  constructor (options) {
    this.options = options
  }
  getCanData (req, res) {
    res.json(mockCanData)
  }
}

module.exports = BookingModel
