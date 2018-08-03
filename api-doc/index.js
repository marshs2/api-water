var express = require('express')
var router = express.Router()
var swaggerUi = require('swagger-ui-express')
var swaggerDocument = require('./swagger.json')

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })
// define the home page route
router.get('/', function (req, res) {
  res.send('Api Doc Test')
})
// define the about route
// router.get('/about', function (req, res) {
//   res.send('About birds')
// })
var app = express()
// app.use('/', router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/docs/sample', router)
app.listen(4000)
