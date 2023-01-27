import HttpError from './HttpError.js';

export default class IncorrectDataError extends HttpError {
    constructor(message) {
        super(message)
        this.name = 'IncorrectDataError'
        this.status = 400;
    }
}
