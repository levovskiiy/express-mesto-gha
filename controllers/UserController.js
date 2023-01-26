import User from '../models/User'

class UserController {
  static async getUsers(req, res) {
    try {
      const users = await User.find({})
      res.send({ data: users })
    } catch (err) {
      res.status(500).send(`Статус ответа: ${500}\n, Ошибка: ${err.message}`)
    }
  }

  static async getUser(req, res) {
    try {
      const { _id: id } = req.body
      const user = await User.findById(id)
      res.send({ data: user })
    } catch (err) {
      res.status(500).send(`Статус ответа: ${500}\n Ошибка: ${err.message}`)
    }
  }

  static async createUser(req, res) {
    try {
      const { name, about, avatar } = req.body
      const createdUser = User.create({ name, about, avatar })
      res.status(201).send({ data: createdUser })
    } catch (err) {
      res.status(500).send(`Статус ответа: ${500}\n Ошибка: ${err.message}`)
    }
  }
}

export default UserController
