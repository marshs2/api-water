const express = require('express')
const app = express()
app.use(function (err, req, res, next) {
  console.log(err.stack)
})
app.get('/', (req, res, next) => {
  // throw new Error('test')
  // res.send('Hello World!')
  setTimeout(() => {
    try {
      throw new Error('async error')
    } catch (err) {
      next(err)
    }
  }, 1000)
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))
