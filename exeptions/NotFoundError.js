const HttpError = require('./HttpError')

module.exports = class NotFoundError extends HttpError {
  constructor(message) {
    super(message)
    this.statusCode = 404
    this.name = 'NotFoundError'
  }
}
