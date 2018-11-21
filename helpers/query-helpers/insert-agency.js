/**
 * Use this to run this program to insert sample data into agency table
 * PGUSER=power_user \
  PGHOST=ec2-13-127-170-233.ap-south-1.compute.amazonaws.com \
  PGPASSWORD=poweruserpassword \
  PGDATABASE=water_db \
  PGPORT=5432 \
  NODE_ENV=development \
  NODE_HOST=ec2-13-127-170-233.ap-south-1.compute.amazonaws.com \
  node index.js
 */

const DBUtils = require('../../services/db-service/db-utils')
class InsertAgency extends DBUtils {
  constructor (options) {
    super(options)
    this.opts = options
  }
  insertAgencyData () {
    let self = this
    let queryString = `INSERT INTO agency(
        agency_name, agency_address, mobile_no, supporting_radius, auto_enable, no_of_available_cans, filling_availabity_duration, agency_code,  availabilty, geom)
       VALUES ('jansi agency', 'jansi street ambattur', 16909090, 5, true, 100, '10-5', 1, true, ST_GeomFromText('POINT(80.1452711 13.1228249)', 4326));
   `
    super.connect()
    let query = {
    // give the query a unique name
      name: 'fetch-nearby-agency',
      text: queryString
    // values: [1]
    }
    return new Promise((resolve, reject) => {
      super.queryPromise(query).then(function (data) {
        self.disConnect()
        resolve(data.rows)
      }).catch(e => {
        self.disConnect()
        reject(e.stack)
      })
    })
  }
  disConnect () {
    super.disConnect()
  }
}

let options = {
  PGUSER: process.env.PGUSER,
  PGHOST: process.env.PGHOST,
  PGPASSWORD: process.env.PGPASSWORD,
  PGDATABASE: process.env.PGDATABASE,
  PGPORT: process.env.PGPORT
}
let insertAgency = new InsertAgency(options)
insertAgency.insertAgencyData().then((data) => {
  console.log(data)
}).catch((error) => {
  console.error(error)
})

module.exports = InsertAgency
