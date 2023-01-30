const bcrypt = require('bcrypt')
const UserService = require('../services/UserService')

const dotenv = require('dotenv')
dotenv.config()

const { JWT_SECRET = 'DEV_MODE' } = process.env
module.exports = {
  /**
   * Получение всех пользователей
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  async getAll(req, res, next) {
    try {
      const users = await UserService.getAll()

      res.send({ data: users })
    } catch (err) {
      next(err)
    }
  },

  /**
   * Получение пользователя по ID
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  async getOne(req, res, next) {
    try {
      const { userId } = req.params
      const user = await UserService.getOne(userId)

      res.send({ data: user })
    } catch (err) {
      next(err)
    }
  },

  async getCurrent(req, res, next) {
    try {
      const user = await UserService.getOne(req.user.id)

      res.send({ data: user })
    } catch (err) {
      next(err)
    }
  },

  /**
   * Создание пользователя
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  async create(req, res, next) {
    try {
      const { email, password } = req.body
      const hashPassword = await bcrypt.hash(password, 10)

      const createdUser = await UserService.create({
        email,
        password: hashPassword,
      })

      res.status(201).send({ data: createdUser })
    } catch (err) {
      next(err)
    }
  },

  /**
   * Обновление данных профиля
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  async update(req, res, next) {
    try {
      const { name, about } = req.body
      const { id } = req.user

      const updatedUser = await UserService.update({ name, about }, id)

      res.send({ data: updatedUser })
    } catch (err) {
      next(err)
    }
  },

  /**
   * Обновление аватара пользователя
   * @param req
   * @param res
   * @return {Promise<void>}
   */
  async updateAvatar(req, res, next) {
    try {
      const { avatar } = req.body
      const { id } = req.user

      const updatedAvatar = await UserService.updateAvatar(avatar, id)

      res.send({ data: updatedAvatar })
    } catch (err) {
      next(err)
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await UserService.login(email, password)

      const token = sign({ id: user._id }, JWT_SECRET)

      res
        .cookie('jwt', token, { httpOnly: true, sameSite: true })
        .send({ message: 'logged!' })
    } catch (err) {
      next(err)
    }
  },
}
