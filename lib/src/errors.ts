import { ErrorElement } from "./types";


export type ErrorType = {
    statusCode?: number,
    name?: string,
    message: string,
    errors: Array<ErrorElement>
 }


export class ValidationError extends Error {
    // message: string
    // errors?: Array<ErrorElement>

    constructor(message: string, errors: Array<ErrorElement>) {
        super(message);
        this.message = message,
        this.errors = errors;
    }

    static createValidError(errors) {
        return new ValidationError('validationError', errors);
    }
}

export class RedirectError extends Error {
    message: string
    errors?: any

    constructor(message: string, errors: any) {
        super(message);
        this.message = message,
        this.errors = errors;
    }

    static createRedirectError(errors) {
        return new RedirectError('redirectError', errors);
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