const HTTP_RESPONSE = {

  'FILE_NOT_FOUND': {
    'REASON': 'FILE NOT FOUND',
    'MESSAGE': 'PATH TO FILE NOT EXIST',
    'CODE': 400
  },
  'AUTHORISATION': {
    'REASON': 'unauthorized',
    'MESSAGE': 'TOKEN NOT FOUND | MISMATCH',
    'CODE': 401
  },
  'BAD_REQUEST': {
    'REASON': 'bad request',
    'MESSAGE': 'bad request',
    'CODE': 400
  },
  'SERVER_ERROR': {
    'REASON': 'Internal Server Error',
    'MESSAGE': 'Internal Server Error',
    'CODE': 500
  },
  'SUCCESS': {
    'REASON': 'success',
    'MESSAGE': 'successful request',
    'CODE': 200
  },
  'STATUS': {
    'SUCCESS': 'success',
    'FAIL': 'fail'
  }

}

module.exports = HTTP_RESPONSE
