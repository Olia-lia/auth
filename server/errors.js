
module.exports = class AuthErrors extends Error {
    constructor(statusCode, message, errors) {
        super(message);
          this.statusCode = statusCode,
          this.message = message,
          this.errors = errors
        }
  
        static Unauthorized(message){
          return new AuthErrors(401, message)
        }
        
        static BadRequest(message, errors = []) {
          return new AuthErrors(400, message, errors) 
        }
  
        static ForbiddenError(message) {
          return new AuthErrors(403, message)
          //403 токен передан и клиент узнан, но не имеет доступа к контенту
        }
  };
