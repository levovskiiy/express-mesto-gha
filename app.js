import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import users from './routes/users'

dotenv.config()

const { PORT, DB_CONNECTION } = process.env

const app = express()

app.use('/', users)
mongoose.connect(DB_CONNECTION)

app.listen(PORT)
