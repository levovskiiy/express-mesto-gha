import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import users from './routes/users'

const PORT = 5000
const DB_CONN = 'mongodb://localhost:27017/mestodb'

const app = express()

app.use('/', users)
mongoose.connect(DB_CONN)

app.listen(PORT)
