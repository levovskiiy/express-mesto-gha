const UserService = require('../services/UserService')
const HttpError = require('../exeptions/HttpError')

module.exports = {
  /**
   * Получение всех пользователей
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  async getAll(req, res) {
    try {
      const users = await UserService.getAll()

      res.send({ data: users })
    } catch (err) {
      if (err instanceof HttpError) {
        res.status(err.status).send({ message: err.message })
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере' })
      }
    }
  },

  /**
   * Получение пользователя по ID
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  async getOne(req, res) {
    try {
      const { userId } = req.params
      const user = await UserService.getOne(userId)

      res.send({ data: user })
    } catch (err) {
      if (err instanceof HttpError) {
        res.status(err.status).send({ message: err.message })
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере' })
      }
    }
  },

  /**
   * Создание пользователя
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  async create(req, res) {
    try {
      const { name, about, avatar } = req.body
      const createdUser = await UserService.create({
        name,
        about,
        avatar,
      })

      res.status(201).send({ data: createdUser })
    } catch (err) {
      if (err instanceof HttpError) {
        res.status(err.status).send({ message: err.message })
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере' })
      }
    }
  },

  /**
   * Обновление данных профиля
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  async update(req, res) {
    try {
      const { name, about, avatar } = req.body
      const { id } = req.user

      const updatedUser = await UserService.update({ name, about, avatar }, id)

      res.send({ data: updatedUser })
    } catch (err) {
      if (err instanceof HttpError) {
        res.status(err.status).send({ message: err.message })
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере' })
      }
    }
  },

  /**
   * Обновление аватара пользователя
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  async updateAvatar(req, res) {
    try {
      const { avatar } = req.body
      const { id } = req.user

      const updatedAvatar = await UserService.updateAvatar(avatar, id)

      res.send({ data: updatedAvatar })
    } catch (err) {
      if (err instanceof HttpError) {
        res.status(err.status).send({ message: err.message })
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере' })
      }
    }
  },
}
