const {
  Client
} = require('pg')
const DB_EXCEPTION = require('./db-errors')
// const connectionString = 'postgres://power_user:poweruserpassword@ec2-13-127-170-233.ap-south-1.compute.amazonaws.com:5432/postgres'

// const client = new Client({
//   connectionString: connectionString
// })
// const query = {
//   // give the query a unique name
//   name: 'fetch-user',
//   text: 'SELECT * FROM testtable'
//   // values: [1]
// }
// client.connect()

// client.query(query, (err, res) => {
//   console.log(res.rows)
//   client.end()
//   if (err) {
//     console.log(err)
//   }
// })

class DBUtils {
  constructor (options) {
    this.options = options
    if (this.options && this.options.autoConnect) {
      this.client = new Client({
        connectionString: this.getConnectionString()
      })
    }
  }
  getConnectionString () {
    let user = this.options.config.scope.getConfig('PGUSER') // process.env.PGUSER
    let password = this.options.config.scope.getConfig('PGPASSWORD') // process.env.PGPASSWORD
    let host = this.options.config.scope.getConfig('PGHOST') // process.env.PGHOST
    let port = this.options.config.scope.getConfig('PGPORT') // process.env.PGPORT
    let database = this.options.config.scope.getConfig('PGDATABASE') // process.env.PGDATABASE
    let connectionString

    if (!user || !password || !host || !port || !database) {
      throw Error(DB_EXCEPTION.DB_CONNECTION_ERROR.MESSAGE)
    }

    connectionString = 'postgres://' + user + ':' + password + '@' + host + ':' + port + '/' + database
    return connectionString
  }
  connect () {
    this.client = new Client({
      connectionString: this.getConnectionString()
    })
  }
  disConnect () {
    this.client.end()
  }
  /*
  Query config object methodolg
  config = {
  text: 'INSERT INTO users(name, email) VALUES($1, $2)',
  values: ['brianc', 'brian.m.carlson@gmail.com'],
   */
  query (config, handler) {
    this.client.query(config, handler)
  }
  queryPromise (config) {
    return this.client(config)
  }
}

module.exports = DBUtils
