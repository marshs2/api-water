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
  /** @description DButils used for database connection and query utilisation
 * @param {} {Object} { autoConnect :'true|false to connect during connection init' , config_scope : 'nconf object for env stuffs' }
 * @return {null}
 */
  constructor (options) {
    this.options = options
    if (this.options && this.options.autoConnect) {
      this.client = new Client({
        connectionString: this.getConnectionString()
      })
    }
  }
  getConnectionString () {
    let user = this.options.config_scope.getConfig('PGUSER')
    let password = this.options.config_scope.getConfig('PGPASSWORD')
    let host = this.options.config_scope.getConfig('PGHOST')
    let port = this.options.config_scope.getConfig('PGPORT')
    let database = this.options.config_scope.getConfig('PGDATABASE')
    let connectionString

    if (!user || !password || !host || !port || !database) {
      console.log(this.options)
      throw Error(DB_EXCEPTION.DB_CONNECTION_ERROR.MESSAGE + user + ',' + password + ',' + process.env.PGUSER)
    }

    connectionString = 'postgres://' + user + ':' + password + '@' + host + ':' + port + '/' + database
    return connectionString
  }
  connect () {
    this.client = new Client({
      connectionString: this.getConnectionString()
    })
    this.client.connect()
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
  query (query, handler) {
    this.client.query(query, handler)
  }
  queryPromise (query) {
    return this.client.query(query)
  }
}

module.exports = DBUtils
