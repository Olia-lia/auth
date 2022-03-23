const AuthErrors = require('./errors')

module.exports = (error, request, response, next) => {
  const {statusCode, message, errorsArray} = error
  if(error instanceof AuthErrors) 
    response.status(statusCode).json({
      message,
      errorsArray
    }
  )
  return response.status(500).json({message: 'modalError',
    errorsArray: 'Server error! Something is broken!'
  })
};
