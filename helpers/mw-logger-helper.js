const express = require('express')
const app = express()

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
app.use(function (err, req, res, next) {
  console.log('abc', err.stack)
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))
