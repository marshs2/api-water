var crypto = require('crypto')

var mykey = crypto.createCipher('aes-128-cbc', 'mypassword')
var mystr = mykey.update('abc', 'utf8', 'hex')
mystr += mykey.update.final('hex')

console.log(mystr) // 34feb914c099df25794bf9ccb85bea72

// var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword')
// var mystr = mykey.update('34feb914c099df25794bf9ccb85bea72', 'hex', 'utf8')
// mystr += mykey.update.final('utf8')

// console.log(mystr) // abc
