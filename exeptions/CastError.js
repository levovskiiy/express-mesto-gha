const { Error } = require('mongoose')

module.exports = class CastError extends Error.CastError {
  constructor(props) {
    super(props)
    this.statusCode = 400
  }
}
