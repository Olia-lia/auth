import { ErrorType } from "./typesGlobal";

const ErrorTypes = {
  validationErrror: "validationError",
  pageError: "modalError",
}

// export const handleError = async(error: any) => {
//   const data: ErrorType = await error.json()
//   const {message, errorsArray} = await data
//   switch (error.status) {
//     case(401):
//       //localStorage.removeItem('accessToken');
//       return data
//       break
    
//     case(400): 
//       return data
//       break

//     // case(404):
//     //   return data 
//     //   break
    
//     default: 
//       return data
//   }
// };


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