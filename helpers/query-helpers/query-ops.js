/**
 * Use this to run this program to insert sample data into agency table
 * 
 */

const DBUtils = require('../../services/db-service/db-utils')
class QueryOps extends DBUtils {
  constructor (options) {
    super(options)
    this.opts = options
  }
  showAgency (payload) {
    let self = this
    let queryString = `SELECT agency_id,agency_name,agency_address,mobile_no,supporting_radius,auto_enable,no_of_available_cans,availabilty,ST_AsGeoJSON(geom) as location FROM agency`

    super.connect()
    let query = {
    // give the query a unique name
      name: 'showall-agency',
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
  insertAgencyData (payload) {
    let self = this

    let queryString = "INSERT INTO agency(agency_name, agency_address, mobile_no, supporting_radius, auto_enable, no_of_available_cans, filling_availabity_duration, agency_code,  availabilty, geom) VALUES ('" +
        payload.agency_name + "','" + payload.agency_street + "'," + payload.mob_no + ',' + payload.sup_rad + ',' + payload.auto_enable + ',' + payload.avail_cans + ",'" + payload.fill_dur + "'," + payload.agency_code + ',' + payload.availablity + ',' + "ST_GeomFromText('POINT(" + payload.long + ' ' + payload.lat + ")',4326))"
    super.connect()
    let query = {
    // give the query a unique name
      name: 'insert-agency',
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

const express = require('express')
const app = express()
const port = 5001
const options = {
  PGUSER: process.env.PGUSER,
  PGHOST: process.env.PGHOST,
  PGPASSWORD: process.env.PGPASSWORD,
  PGDATABASE: process.env.PGDATABASE,
  PGPORT: process.env.PGPORT
}
let queryOps = new QueryOps(options)

app.listen(port, () => {
  console.log('lisitening on port ' + port)
})
app.get('/insert-agency', function (req, res) {
  queryOps.insertAgencyData(req.query).then((data) => {
    res.json({
      data: data,
      success: true
    })
  }).catch((error) => {
    console.log(error)
    res.json({
      error: true,
      stack_trace: error
    })
  })
})
app.get('/show-agency', function (req, res) {
  queryOps.showAgency(req.query).then((data) => {
    res.json({
      data: data
    })
  }).catch((error) => {
    res.json({
      error: error
    })
  })
})

// let insertAgency = new QueryOps(options)
// insertAgency.insertAgencyData().then((data) => {
//   console.log(data)
// }).catch((error) => {
//   console.error(error)
// })

// module.exports = QueryOps
