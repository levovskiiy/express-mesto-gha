const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')

const { errors } = require('celebrate')
const { default: helmet } = require('helmet')

const ValidationError = require('./exeptions/ValidationError')
const CastError = require('./exeptions/CastError')
const RequestError = require('./exeptions/RequestError')
const routes = require('./routes/index')

dotenv.config()

const DB_CONN = 'mongodb://localhost:27017/mestodb'
const { PORT = 5000 } = process.env

const app = express()

app.use(helmet())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(DB_CONN)

app.use(routes)
app.use(errors())
app.use((err, req, res, next) => {
  console.log(err)
  if (err instanceof mongoose.Error.ValidatorError) {
    next(new ValidationError(err))
  }

  if (err instanceof mongoose.Error.CastError) {
    next(new CastError(err))
  }

  if (err.code === 11000) {
    next(new RequestError('Пользователь с таким email уже существует'))
  }

  next(err)
})

app.use((err, req, res, next) => {
  const { status = 500, message } = err
  res.status(status).send({ message })
  next()
})
app.listen(PORT)
