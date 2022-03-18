
export class AuthErrorsHandler extends Error {
    constructor (status: number, message: string) {
        super(message)
        this.status = status;
        this.message = message

    }
} 




  
// const catchError = (error) => {
//   const {status} = error
//   switch (status) {
//        case(401):
//          localStorage.removeItem('accessToken');

//         //if (!refreshtoken} 
//   }
// };