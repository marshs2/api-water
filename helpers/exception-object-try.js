
const serializeError = require('serialize-error')
const error = new Error({a: 'a'})

console.log(error)
//= > [Error: unicorn]

console.log(serializeError(error))
