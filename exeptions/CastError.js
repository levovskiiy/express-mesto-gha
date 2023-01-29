const { Error } = require('mongoose')

module.exports = class CastError extends Error.CastError {
  constructor(props) {
    super(props)
    this.status = 400
  }
}
