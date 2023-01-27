import HttpError from '../exeptions/HttpError.js'
import CardService from '../services/CardService.js'

export default {
    async getAll(req, res) {
        try {
            const cards = await CardService.getAll()

            res.send({ data: cards })
        } catch (err) {
            res.status(500).send({ message: 'Произошла ошибка на сервере' })
        }
    },

    async create(req, res) {
        try {
            const { name, link } = req.body
            const { id } = req.user

            const card = await CardService.create({ name, link, owner: id })

            res.send({ data: card })
        } catch (err) {
            if (err instanceof HttpError) {
                res.status(err.status).send({ message: err.message })
            } else {
                res.status(500).send({ message: 'Произошла ошибка на сервере' })
            }
        }
    },

    async delete(req, res) {
        try {
            const { cardId } = req.params
            const { id } = req.user

            const deletedCard = await CardService.delete(cardId, id)

            res.send({ data: deletedCard })
        } catch (err) {
            if (err instanceof HttpError) {
                res.status(err.status).send({ message: err.message })
            } else {
                res.status(500).send({ message: 'Произошла ошибка на сервере' })
            }
        }
    },

    async like(req, res) {
        try {
            const { cardId } = req.params
            const { id } = req.user

            const likedCard = await CardService.like(cardId, id)

            res.send({ data: likedCard })
        } catch (err) {
            if (err instanceof HttpError) {
                res.status(err.status).send({
                    message: err.message,
                })
            } else {
                res.status(500).send({ message: 'Произошла ошибка на сервере' })
            }
        }
    },

    async unlike(req, res) {
        try {
            const { cardId } = req.params
            const { id } = req.user

            const unlikedCard = await CardService.unlike(cardId, id)

            res.send({ data: unlikedCard })
        } catch (err) {
            if (err instanceof HttpError) {
                res.status(err.status).send({ message: err.message })
            } else {
                res.status(500).send({ message: 'Произошла ошибка на сервере' })
            }
        }
    },
}
