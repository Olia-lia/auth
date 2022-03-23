const AuthErrors = require('./errors')

module.export = (error, request, response, next) => {
  console.log(error)
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
