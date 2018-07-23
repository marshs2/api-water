let AuthService = require('../services/auth-service/auth-service')
let authService = AuthService.instance
authService.sign({
  data: {
    foo: 'bar'
  },
  secret: 'secret',
  config: {expiresIn: 120}
}).then(function (data) {
  console.log('data', data)
  let testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1MzIzNjc4MjUsImV4cCI6MTUzMjM2Nzk0NX0.NDCFKRuLHFLVfu3BfKyHc4Ag0Hmc3tYNMA7h4_nfW6w'
  authService.verify({token: testToken, secret: 'secret'}).then(function (decoded) {
    console.log('decoded', decoded)
  }).catch(function (error) {
    console.log(error)
  })
}).catch(function (error) {
  console.log(error)
})
