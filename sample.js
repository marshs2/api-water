var prom = new Promise(function (resolve, reject) {
  resolve('data')
  console.log('hello')
})
prom.then(function (data) {
  console.log('Data', data)
})
