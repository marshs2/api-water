
var DBUtils = require('../../services/db-service/db-utils')
const _ = require('lodash')
const ERRORS = require('./errors')
const CONSTANTS = require('./constants')
class BookingService extends DBUtils {
  constructor (options) {
    super(options)
    this.options = options
  }
  getInitialCanData () {
    let self = this
    let bookingData
    let query = {
      // give the query a unique name
      name: 'fetch-can',
      text: 'SELECT can_id, company_id, can_type, units, is_default, default_value FROM public.can INNER JOIN units ON public.can.units_id = public.units.units_id;'
      // values: [1]
    }
    super.connect()
    return new Promise((resolve, reject) => {
      super.queryPromise(query).then(function (data) {
        if (!data.rows.length) {
          self.disConnect()
          reject(new Error(ERRORS.EMPTY_RECORDS.MESSAGE))
        }
        bookingData = self.computeDefaultCanData(data)
        self.disConnect()
        resolve(bookingData)
      }).catch(e => {
        self.disConnect()
        reject(e.stack)
      })
    })
  }

  computeDefaultCanData (data) {
    let defaultCanOptions = _.find(data.rows, function (row) { return row.is_default })
    let json = {canOptions: data.rows,
      defaultCanOption: defaultCanOptions,
      emergency_booking: CONSTANTS.DEFAULT_EMERGENCY_BOOKING,
      upper_bound: CONSTANTS.UPPER_BOUND,
      lower_bound: CONSTANTS.LOWER_BOUND }
    return json
  }

  disConnect () {
    super.disConnect()
  }
}
module.exports = BookingService
