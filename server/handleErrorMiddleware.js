const AuthErrors = require('./errors')

module.exports = (error, request, response, next) => {
  const {statusCode, message, errors} = error
  if(error instanceof AuthErrors) 
    response.status(statusCode).json({
      message,
      errors
    }
  )
  return response.status(500).json({message: 'modalError',
    errors: 'Server error! Something is broken!'
  })
};
