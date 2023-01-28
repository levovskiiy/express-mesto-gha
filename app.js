const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const userRouter = require('./routes/userRouter')
const cardRouter = require('./routes/cardRouter')
const NotFoundError = require('./exeptions/NotFoundError')

dotenv.config()

const DB_CONN = 'mongodb://localhost:27017/mestodb'
const { PORT } = process.env

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
  const { status = 500, message } = err

  res.status(status).send({ message })
  next()
})
app.listen(PORT)
