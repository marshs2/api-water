var DBUtils = require('../../services/db-service/db-utils')
class BookingService extends DBUtils {
  constructor (options) {
    super(options)
    this.options = options
  }
  getInitialCanData () {
    let query = {
      // give the query a unique name
      name: 'fetch-can',
      text: 'SELECT can_id, company_id, can_type, units, is_default, default_value FROM public.can INNER JOIN units ON public.can.units_id = public.units.units_id;'
      // values: [1]
    }
    super.connect()
    return super.queryPromise(query)
  }
  disConnect () {
    super.disConnect()
  }
}
module.exports = BookingService
