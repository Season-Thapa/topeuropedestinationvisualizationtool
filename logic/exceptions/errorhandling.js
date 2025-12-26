class CustomError extends Error {

    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
class BodyParsingError extends CustomError {

    constructor(message) {
        super(400, message);
    }
}

export { CustomError, BodyParsingError }
