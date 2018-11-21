const DBUtils = require('../../services/db-service/db-utils')
class InsertAgency extends DBUtils {
  constructor (options) {
    super(options)
    this.options = options
  }
  insertAgencyData () {
    let self = this
    let queryString = `INSERT INTO public.agency(
        agency_name, agency_address, mobile_no, supporting_radius, auto_enable, no_of_available_cans, filling_availabity_duration, agency_code,  availabilty, geom)
       VALUES ('vivekanda agency', 'thiruvalluvar street perambur', 90909090, 5, true, 100, '10-5', 1, true, ST_GeomFromText('POINT(80.2453592 13.1080631)', 4326));
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
        if (!data.rows.length) {
          self.disConnect()
          reject(new Error('empty'))
        }

        self.disConnect()
        resolve(data.rows)
      }).catch(e => {
        self.disConnect()
        reject(e.stack)
      })
    })
    
  }
}

let insertAgency = new InsertAgency()
insertAgency.insertAgencyData().then(()=>{
    console.log()
})

 module.exports = InsertAgency
