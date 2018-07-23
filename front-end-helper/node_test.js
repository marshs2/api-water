var express = require('express')
var app = express()
var http = require('http').Server(app)
var bodyParser = require('body-parser')
var path = require('path')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')


// Add this line below
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(bodyParser.json())
app.use(express.static(__dirname))
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/testpost', function (req, res) {
  // var username = bcrypt.hashSync(req.body.user, 8)
  var hash = '$2a$08$huMN/odMT6S2xA4D6rMctO.UwDVoJ1J7DD/e5gmll3CfaR3H0nL6y'
  var matchStatus = false
  // res.send('<h1>Hello</h1> ' + username)
  bcrypt.compare(req.body.user, hash, function (err, success) {
    if (err) { matchStatus = false } else { matchStatus = true }
    res.json({usr: matchStatus})
  })
})

http.listen(3000, function () {
  console.log('listening on *:3000')
})
