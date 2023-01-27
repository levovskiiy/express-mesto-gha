import { Router } from 'express'
import userController from '../controllers/UserController.js'

const userRouter = new Router()

userRouter.get('/users', userController.getAll)
userRouter.get('/users/:userId', userController.getOne)
userRouter.post('/users', userController.create)
userRouter.patch('/users/me', userController.update)
userRouter.patch('/users/me/avatar', userController.updateAvatar)

export default userRouter
