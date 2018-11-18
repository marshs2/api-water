/* Agency Routes Service Provides router deinition and exposing express callback to weblayer(API) of agency model(AgencyAPI) */
let RouterService = require('../../services/router-service/router-service')
let routerService = new RouterService()
let agencyAPI
const ERRORS = require('./agency-errors')
let AgencyAPI = require('./agency-api')
class AgencyRoutes {
  constructor (options) {
    this.options = options
    agencyAPI = new AgencyAPI(options)
  }
  /**
   * @description This method is used to add endpoints to all agency model components
   */
  initRoutes () {
    try {
      routerService.addRouter({path: '/nearby-agency', method: 'get', callback: agencyAPI.getNearByAgency.bind(agencyAPI)})
    } catch (error) {
      throw new Error(ERRORS.ROUTER_INIT_ERROR)
    }
  }
  /**
   * @description returns Registered Routes of agency module
   * @param {null}
   * @return {express registered router}
   */
  getRouter () {
    return routerService.getRouter()
  }
}

module.exports = AgencyRoutes
