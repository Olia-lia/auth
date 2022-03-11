
module.exports = class AuthErrors extends Error {
    constructor(statusCode, message) {
      super(message);
        this.statusCode = statusCode,
        this.message = message
      }
  
  
      Unauthorized(message) {
        //401 если токен неверен / истекла сессия
        //нет комбинации пароля и логина
        statusCode = 401
        message = message
      }
      
  
      BadRequest(message) {
  
        //400 или 401 если токен не передан
      }
  
      Forbidden () {
        //403 токен передан и клиент узнан, но не имеет доступа к контенту
      }
  
  };