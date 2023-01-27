module.exports = class HttpError extends Error {
  constructor(message) {
    super(message)
    this.status = 500
  }
}
