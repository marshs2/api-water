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
  defaultMaxFiles: '14d'
}

module.exports = config
