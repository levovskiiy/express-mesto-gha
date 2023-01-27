const Card = require('../models/Card')
const NotFoundError = require('../exeptions/NotFoundError')
const IncorrectDataError = require('../exeptions/IncorrectDataError')
const RequestError = require('../exeptions/RequestError')

module.exports = {
  /**
   * Достает из базы данных все карточки
   */
  async getAll() {
    const cards = await Card.find({})

    return cards
  },

  /**
   * Создание карточки
   * @param {Object} card
   * @return {Promise<card>}
   */
  async create(cardData) {
    if (!cardData) {
      throw new IncorrectDataError(
        'Переданы некорректные данные при создании карточки.'
      )
    }

    return Card.create(cardData)
  },

  /**
   * Находит карточку у пользователя и удаляет ее
   * @param {String} cardId
   */
  async delete(cardId, userId) {
    const card = await Card.findById(cardId)

    if (card === null) {
      throw new NotFoundError('Карточка с указанным ID не найдена.')
    }

    if (card.owner.toString() !== userId) {
      throw new RequestError(
        'Переданный ID пользователя не совпадает с ID пользователя карточки.'
      )
    }

    return card.delete()
  },

  /**
   * Ставит лайк карточке у пользователя
   * @param {String} cardId
   * @param {String} userId
   */
  async like(cardId, userId) {
    if (!(cardId || userId)) {
      throw new IncorrectDataError(
        'Переданы некорректные данные для постановки лайка.'
      )
    }

    const likedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true }
    ).populate(['owner', 'likes'])

    if (likedCard === null) {
      throw new NotFoundError('Передан несуществующий id карточки')
    }

    return likedCard
  },

  /**
   * Ставит дизлайк карточке у пользователя
   * @param {String} cardId
   * @param {String} userId
   */
  async unlike(cardId, userId) {
    if (!(cardId || userId)) {
      throw new IncorrectDataError(
        'Переданы некорректные данные для снятия лайка.'
      )
    }

    const unlikedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true }
    ).populate(['owner', 'likes'])

    if (unlikedCard === null) {
      throw new NotFoundError('Передан несуществующий id карточки')
    }

    return unlikedCard
  },
}
