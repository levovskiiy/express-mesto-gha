import { Router } from 'express'
import UserController from '../controllers/UserController.js'

const userRouter = new Router()

userRouter.get('/users', UserController.getUsers)
userRouter.get('/users/:userId', UserController.getUser)
userRouter.post('/users', UserController.createUser)

export default userRouter
