const ErrorHandler = require('../../services/error-handler/error-handler')
const errorHandler = ErrorHandler.instance
let errorData = {
  data: {'hi': 'error'},
  severity: errorHandler.getSeverity().HIGH,
  level: errorHandler.getLoggerLevel.info,
  isOperational: false,
  route: request.originalUrl
}
throw new Error(errorHandler.sendError(errorData))
