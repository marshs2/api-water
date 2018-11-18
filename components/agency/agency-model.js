/* Agency Model class provides bussiness logic for agency model. */
let AgencyService = require('./agency-service')
let agencyService
class AgencyModel {
  constructor (options) {
    agencyService = new AgencyService(options)
    this.options = options
  }
  getNearByAgency (payload) {
    return agencyService.getNearByAgency(payload)
  }
}

module.exports = AgencyModel
