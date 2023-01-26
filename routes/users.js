import { Router } from 'express'
import UserController from '../controllers/UserController'

const router = new Router()

router.get('/users', UserController.getUsers)
router.get('/users/:userId', UserController.getUser)
router.post('/users', UserController.createUser)

export default router
