const dotenv = require('dotenv');
const { verify } = require('jsonwebtoken');
const UnauthorizedError = require('../exeptions/UnauthorizedError');

dotenv.config();
const { JWT_SECRET = 'DEV_MODE' } = process.env;

module.exports = function auth(req, res, next) {
  const { jwt } = req.cookies;

  if (!jwt) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
    return;
  }

  try {
    const payload = verify(jwt, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
  }
};
