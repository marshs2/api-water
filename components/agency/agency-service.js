
var DBUtils = require('../../services/db-service/db-utils')
const _ = require('lodash')
const ERRORS = require('./agency-errors')
const CONSTANTS = require('./agency-constants')
const HTTP_RESPONSE = require('../../globals/http-response')
class AgencyService extends DBUtils {
  constructor (options) {
    super(options)
    this.options = options
  }
  /** @description This method is used to fetch all possible can data from can table
   *
   */
  getNearByAgency (payload) {
    let self = this
    let agencyData
    let queryString = 'SELECT * FROM agency WHERE ST_DWithin(geom, ST_MakePoint(' + payload.long + ',' + payload.lat + ')::geography, 5000);'
    let query = {
      // give the query a unique name
      name: 'fetch-nearby-agency',
      text: queryString
      // values: [1]
    }
    super.connect()
    return new Promise((resolve, reject) => {
      super.queryPromise(query).then(function (data) {
        if (!data.rows.length) {
          self.disConnect()
          reject(new Error(ERRORS.EMPTY_RECORDS.MESSAGE))
        }
        agencyData = self.computeAgencyList(data.rows)
        self.disConnect()
        resolve(agencyData)
      }).catch(e => {
        self.disConnect()
        reject(e.stack)
      })
    })
  }
  /** @description xxx
   *
   * @param {*} data {record result of joined can + unit table}
   */
  computeAgencyList (data) {
    let json = {
      status: HTTP_RESPONSE.STATUS.SUCCESS,
      data: data
    }
    return json
  }
  /** @description disconnect postgreesql server connection
   *
   */
  disConnect () {
    super.disConnect()
  }
}
module.exports = AgencyService
