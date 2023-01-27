import { Router } from 'express'
import CardController from '../controllers/CardController.js'

const cardRouter = new Router()

cardRouter.get('/cards', CardController.getAll)
cardRouter.post('/cards', CardController.create)
cardRouter.delete('/cards/:cardId', CardController.delete)
cardRouter.put('/cards/:cardId/likes', CardController.like)
cardRouter.delete('/cards/:cardId/likes', CardController.unlike)

export default cardRouter
