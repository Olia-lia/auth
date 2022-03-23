
module.exports = class AuthErrors extends Error {
    constructor(statusCode, message, errorsArray) {
        super(message);
          this.statusCode = statusCode,
          this.message = message,
          this.errorsArray = errorsArray
        }
  
        static Unauthorized(message, errorsArray){
          return new AuthErrors(401, message, errorsArray)
        }
        
        static BadRequest(message, errorsArray = []) {
          return new AuthErrors(400, message, errorsArray) 
        }
  
        static ForbiddenError(message) {
          return new AuthErrors(403, message)
          //403 токен передан и клиент узнан, но не имеет доступа к контенту
        }
  };
