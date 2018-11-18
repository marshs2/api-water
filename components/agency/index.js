/**
 /*
 Agency Model root script for bootstraping Agency components routes with bussiness logic
 */
let path = require('path')
let AgencyRoutes = require(path.join(__dirname, 'agency-routes.js'))
let agencyRoutes
let apiPrefix = '/api/v1'
/**
 * @description Agency Model root script for registering routes with component bussiness logic , Web Layer Interface and Data Access Layer
 * @param {*} options { config : containg app config+env data object of nconf , config_scope : nconf wrapper scope for maniupulating config+env object
 * , }
 */
function init (options) {
  agencyRoutes = new AgencyRoutes(options)
  agencyRoutes.initRoutes()
  options.app.use(apiPrefix, agencyRoutes.getRouter())
}

module.exports = init
