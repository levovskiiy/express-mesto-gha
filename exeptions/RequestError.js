const HttpError = require('./HttpError')

module.exports = class RequestError extends HttpError {
  constructor(message) {
    super(message)
    this.name = 'RequestError'
    this.status = 409
  }
}
