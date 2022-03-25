

export class AppError {
    message: string
    errors: Array<any>
  
    constructor(message: string, errors) {
      this.message = message;
      this.errors = errors
    }
  };

  
  export class ValidationError extends AppError {
    constructor(message: string, errors) {
      super(message, errors);
      this.message = message,
      this.errors = errors
    }
  
    static createValidError(errors) {
      return new ValidationError('validationError', errors)
    }
  };

  export class ModalError extends AppError {
    constructor(message: string, errors) {
      super(message, errors);
      
    }
    static createModalError(errors) {
      return new ModalError('modalError', errors)
    }
  } 