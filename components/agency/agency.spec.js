/* global define, it, describe */
const expect = require('chai').expect
const config = require('../../ecosystem.config')
const AgencyModel = require('./agency-model')
const agencyModel = new AgencyModel({
  db: config.apps[0].env_development
})
const location = {lat: '13.1120567', long: '80.2028936'}
let agencyList = []

describe('Agency Module Api Component tests', () => {
  it('should return agency list near by perambur', async () => {
    agencyList = await agencyModel.getNearByAgency(location)
    expect(agencyList.status).to.equal('success')
    expect(agencyList.data.length, 'near by agency list is empty').to.be.above(0)
    expect(agencyList.data[0], 'agency_id is not available').to.have.property('agency_id')
    //done()
  })
  it('should have return mandatory attributes', () => {
    expect(agencyList.data[0].agency_id, 'agency_id is not available').to.be.a('number')
    expect(agencyList.data[0].agency_name, 'agency_name is not available').to.be.a('string')
    expect(agencyList.data[0].agency_address, 'agency_address is not available').to.be.a('string')
    expect(agencyList.data[0].mobile_no, 'mobile_no is not available').to.be.a('string')
  })
})
