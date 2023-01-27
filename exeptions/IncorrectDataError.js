const HttpError = require('./HttpError')

module.exports = class IncorrectDataError extends HttpError {
  constructor(message) {
    super(message)
    this.name = 'IncorrectDataError'
    this.status = 400
  }
}
