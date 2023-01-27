import { Router } from 'express'
import UserController from '../controllers/UserController.js'

const userRouter = new Router()

userRouter.get('/users', UserController.getAll)
userRouter.get('/users/:userId', UserController.getOne)
userRouter.post('/users', UserController.create)
userRouter.patch('/users/me', UserController.update)
userRouter.patch('/users/me/avatar', UserController.updateAvatar)

export default userRouter
