const AUTH_EXCEPTION = {
  PAYLOAD_EMPTY:
    {
      MESSAGE: 'payload is empty.',
      ERROR_CODE: 1
    },
  SECRET_EMPTY:
    {
      MESSAGE: 'secret is empty',
      ERROR_CODE: 1
    },
  ALGORITM_OR_KEY_MISSING:
    {
      MESSAGE: 'algorithm and private key both must be present',
      ERROR_CODE: 1
    },
  UNKNOWN_ALGORITHM:
    {
      MESSAGE: 'payload_Unknown algorithm supportedempty',
      ERROR_CODE: 1
    },
  SINGLETON_ERROR:
    {
      MESSAGE: 'Cannot instantiate singleton class use classname.instance instead',
      ERROR_CODE: 1
    }

}
module.exports = AUTH_EXCEPTION
