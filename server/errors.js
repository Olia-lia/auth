
class AuthErrors extends Error {
  constructor(statusCode, message, errorsArray) {
    super(message);
      this.statusCode = statusCode,
      this.message = message
      this.errorsArray = errorsArray
    }

    static Unauthorized(message){
      return new AuthErrors(401, message)
    }
    
    static BadRequest(message, errorsArray = []) {
      return new AuthErrors(400, message, errorsArray) 
    }

    static Forbidden(message) {
      return new AuthErrors(403, message)
      //403 токен передан и клиент узнан, но не имеет доступа к контенту
    }

};
