const dotenv = require('dotenv')
const { Request, Response, next } = require('express')
const { verify } = require('jsonwebtoken')
const UnauthorizedError = require('../exeptions/UnauthorizedError')

dotenv.config()
const { JWT_SECRET = 'DEV_MODE' } = process.env

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
module.exports = function auth(req, res, next) {
  const jwt = req.cookies.jwt

  if (!jwt) {
    next(new UnauthorizedError('Необходимо авторизоваться'))
    return
  }

  try {
    const payload = verify(jwt, JWT_SECRET)
    req.user = payload
    return next()
  } catch (err) {
    next(new UnauthorizedError('Необходимо авторизоваться'))
  }
}
