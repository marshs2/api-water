const config = {
  transports: {
    console: 'Console',
    file: 'File',
    http: 'Http',
    stream: 'Stream'
  },
  defaultTimeZone: 'Asia/Kolkata',
  defaultFileDatePattern: 'YYYY-MM-DD-HH',
  defaultZippedArchive: true,
  defaultMaxSize: '20m',
  defaultMaxFiles: '14d',
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    custom: 7
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    custom: 'yellow'
  }
}

module.exports = config
