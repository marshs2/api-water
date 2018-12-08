
var DBUtils = require('../../services/db-service/db-utils')
const _ = require('lodash')
const ERRORS = require('../../globals/errors.json')
const CONSTANTS = require('./agency-constants')
const HTTP_RESPONSE = require('../../globals/http-response')
class AgencyService extends DBUtils {
  constructor (options) {
    super(options.db)
    this.opts = options
  }

  /** @description This method is used to fetch all possible can data from can table
   *  Performance need to check for this query...
   */
  getNearByAgency (payload) {
    let self = this
    let agencyData
    let radInMeters = 5000
    let queryString = `SELECT a.agency_id, a.agency_name,a.mobile_no,a.owner_name,b.price,ST_Distance(ST_MakePoint(${payload.long},${payload.lat})::geography,a.geom) as distance
    FROM agency as a  inner join agency_can_pricing as b on ${payload.can_id} = b.can_id and a.agency_id = b.agency_id 
    WHERE ST_DWithin(geom, ST_MakePoint(${payload.long},${payload.lat})::geography, ${radInMeters});`
    let query = {
      // give the query a unique name
      name: 'fetch-nearby-agency',
      text: queryString
      // values: [1]
    }
    super.connect()
    return new Promise((resolve, reject) => {
      super.queryPromise(query).then(function (data) {
        self.disConnect()
        agencyData = self.computeAgencyList(data.rows)
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
      status: data.length > 0 ? HTTP_RESPONSE.STATUS.SUCCESS : HTTP_RESPONSE.STATUS.FAIL,
      data: data
    }
    if (json.status === HTTP_RESPONSE.STATUS.FAIL) {
      json.reasonCode = ERRORS.EMPTY_RECORDS.CODE
      json.message = ERRORS.EMPTY_RECORDS.MESSAGE
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
