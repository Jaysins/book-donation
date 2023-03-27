class NotFoundException extends Error {
    constructor(message, statusCode){
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode
    }
}

class ValidationException extends NotFoundException {};
class AuthForbiddenException extends NotFoundException {};
class InvalidOrExpiredToken extends NotFoundException {};


module.exports={
    NotFoundException,
    ValidationException,
    AuthForbiddenException,
    InvalidOrExpiredToken
}
