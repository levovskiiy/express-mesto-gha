import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import userRouter from './routes/userRouter.js'
import cardRouter from './routes/cardRouter.js'

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

app.listen(PORT)
