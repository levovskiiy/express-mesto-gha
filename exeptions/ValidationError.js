const { Error } = require('mongoose')

module.exports = class ValidationError extends Error.ValidatorError {
  constructor(properties = {}) {
    super(properties)
    this.statusCode = 400
  }
}
