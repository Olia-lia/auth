export class ValidationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ValidationError";
    }
  }


  
 export const catchError = (error) => {
    const {status} = error
    const body = error.json()
    switch (status) {
        case(401):
          localStorage.removeItem('accessToken');
          break
          
        case(400): 
          console.log(body)
          break
        
  
          //if (!refreshtoken} 
    }
  }
  