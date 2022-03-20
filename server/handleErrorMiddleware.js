const AuthErrors = require('./errors')


module.export = function (error, request, response, next) {
    console.log(error)
    const {statusCode, message} = error
    if(error instanceof AuthErrors) 
      response.status(statusCode).json({
        statusCode, 
        message,
      }
    )
    return response.status(500).json({
      status: "error",
      message: 'Server error. Something broken!'
    })
  };