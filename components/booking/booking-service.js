var DBUtils = require('../../services/db-service/db-utils')
class BookingService extends DBUtils {
  constructor (options) {
    super(options)
    this.options = options
  }
  getInitialCanData () {
    let query = {
      // give the query a unique name
      name: 'fetch-user',
      text: 'SELECT * FROM testtable'
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
