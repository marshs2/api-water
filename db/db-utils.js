const {
  Client
} = require('pg')
// const connectionString = 'postgres://power_user:poweruserpassword@ec2-13-127-170-233.ap-south-1.compute.amazonaws.com:5432/postgres'

// const client = new Client({
//   connectionString: connectionString
// })
// client.connect()

// client.query('SELECT * FROM testtable', (err, res) => {
//   console.log(res.rows)
//   client.end()
// })

class PostgresManager {
  constructor (options) {
    this.options = options
    if (this.options.autoConnect) {
      this.client = new Client({
        connectionString: this.getConnectionString()
      })
    }
  }
  getConnectionString () {
    let user = this.options.config.getConfig('db:sql:keys:user')
    let password = this.options.config.getConfig('db:sql:keys:password')
    let host = this.options.config.getConfig('db:sql:keys:host')
    let port = this.options.config.getConfig('db:sql:keys:port')
    let database = this.options.config.getConfig('db:sql:keys:database')
    let connectionString

    connectionString = 'postgres://' + user + ':' + password + '@' + host + ':' + port + '/' + database
    return connectionString
  }
  connect () {
    this.client = new Client({
      connectionString: this.getConnectionString()
    })
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

var obj=new PostgresManager();
obj.

//module.exports = PostgresManager
