import { ErrorType } from "./typesGlobal";

const ErrorTypes = {
    validationErrror: 'validationError',
    pageError: 'modalError',

};


export class ValidationError extends Error {
    constructor(message: string, errors: ErrorType) {
        super(message);
        this.message = message,
        this.errors = errors;
    }

    static createValidError(errors) {
        return new ValidationError('validationError', errors);
    }
}

export class RedirectError extends Error {
    constructor(message: string, errors: any) {
        super(message);
        this.message = message,
        this.errors = errors;
    }

    static createRedirectError(errors) {
        return new ValidationError('redirectError', errors);
    }
}

export class ModalError extends Error {
    message: string
    errors?: any
    constructor(message: string, errors: any) {
        super(message);
        this.message = message,
        this.errors = errors;
    }

    static createModalError(errors) {
        return new ModalError('modalError', errors);
    }
}


export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.message = message;
    }

    static createUnauthorizedError(message) {
        return new UnauthorizedError(message);
    }
}

export class UnderfindError extends Error {
    constructor(message: string) {
        super(message);
        this.message = message;
    }
}
