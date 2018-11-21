/* Booking Service is used for DataAccessLayer logic like pulling data from db */
var DBUtils = require('../../services/db-service/db-utils')
const _ = require('lodash')
const ERRORS = require('../../globals/errors.json')
const CONSTANTS = require('./booking-constants')
class BookingService extends DBUtils {
  constructor (options) {
    super(options.db)
    this.opts = options
  }
  /** @description This method is used to fetch all possible can data from can table
   *
   */
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
  /** @description This method merge can default configuartion from code constants to refined can data obtained from can table
   *
   * @param {*} data {record result of joined can + unit table}
   */
  computeDefaultCanData (data) {
    let defaultCanOptions = _.find(data.rows, function (row) { return row.is_default })
    let json = {can_options: data.rows,
      default_can_option: defaultCanOptions,
      emergency_booking: CONSTANTS.DEFAULT_EMERGENCY_BOOKING,
      upper_bound: CONSTANTS.UPPER_BOUND,
      lower_bound: CONSTANTS.LOWER_BOUND }
    return json
  }
  /** @description disconnect postgreesql server connection
   *
   */
  disConnect () {
    super.disConnect()
  }
}
module.exports = BookingService
