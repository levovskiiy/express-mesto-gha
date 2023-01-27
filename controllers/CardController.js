const CardService = require('../services/CardService')

module.exports = {
  async getAll(req, res, next) {
    try {
      const cards = await CardService.getAll()

      res.send({ data: cards })
    } catch (err) {
      next(err)
    }
  },

  async create(req, res, next) {
    try {
      const { name, link } = req.body
      const { id } = req.user

      const card = await CardService.create({ name, link, owner: id })

      res.send({ data: card })
    } catch (err) {
      next(err)
    }
  },

  async delete(req, res, next) {
    try {
      const { cardId } = req.params
      const { id } = req.user

      const deletedCard = await CardService.delete(cardId, id)

      res.send({ data: deletedCard })
    } catch (err) {
      next(err)
    }
  },

  async like(req, res, next) {
    try {
      const { cardId } = req.params
      const { id } = req.user

      const likedCard = await CardService.like(cardId, id)

      res.send({ data: likedCard })
    } catch (err) {
      next(err)
    }
  },

  async unlike(req, res, next) {
    try {
      const { cardId } = req.params
      const { id } = req.user

      const unlikedCard = await CardService.unlike(cardId, id)

      res.send({ data: unlikedCard })
    } catch (err) {
      next(err)
    }
  },
}
