import HttpError from './HttpError.js';

export default class RequestError extends HttpError {
    constructor(message) {
        super(message);
        this.name = 'RequestError';
    }
}
