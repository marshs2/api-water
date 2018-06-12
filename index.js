/*
    This is an Start up script
    Responsible for passing server,db and other configuration objects to the respective components.
    It imports middle ware framework like expressjs,hapi any required libraries needed for it.
    Complie with new ecma script.
*/
let MiddleWare = require('./services/middleware')
let middleware = new MiddleWare({port: 3000, host: 'localhost'})
middleware.startServer()
