const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const userRouter = require('./routes/userRouter')
const cardRouter = require('./routes/cardRouter')
const NotFoundError = require('./exeptions/NotFoundError')
const ValidationError = require('./exeptions/ValidationError')
const CastError = require('./exeptions/CastError')

dotenv.config()

const DB_CONN = 'mongodb://localhost:27017/mestodb'
const { PORT = 5000 } = process.env

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.user = {
    id: '63d305279e43ad224ea6ce0b',
  }

  next()
})

mongoose.connect(DB_CONN)
app.use('/', userRouter)
app.use('/', cardRouter)
app.use('*', (req, res, next) => {
  next(new NotFoundError('Неправильный путь'))
})

app.use((err, req, res, next) => {
  if (err instanceof mongoose.Error) {
    next(new ValidationError(err))
  }

  if (err instanceof mongoose.Error) {
    next(new CastError(err))
  }

  next(err)
})

app.use((err, req, res, next) => {
  // const handleError = () => {
  //   if (err.name === 'ValidationError') {
  //     return new ValidationError('Невалидные данные')
  //   }

  //   if (err.name === 'CastError') {
  //     return new CastError('Невалидный id')
  //   }

  //   return err
  // }

  const { status = 500 } = err
  res.status(status).send({ message: err.message })
  next()
})
app.listen(PORT)
