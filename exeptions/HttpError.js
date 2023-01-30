module.exports = class HttpError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = 500
  }
}
