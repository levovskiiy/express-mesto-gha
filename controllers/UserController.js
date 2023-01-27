import UserService from '../services/UserService.js'

class UserController {
  static async getUsers(req, res) {
    try {
      const users = await UserService.getUsers()
      res.send({ data: users })
    } catch (err) {
      res.status(500).send({
        errorName: err.name,
        message: err.message,
      })
    }
  }

  static async getUser(req, res) {
    try {
      const { userId } = req.params
      const user = await UserService.getUser(userId)
      res.send({ data: user })
    } catch (err) {
      res.status(500).send({
        errorName: err.name,
        message: err.message,
      })
    }
  }

  static async createUser(req, res) {
    try {
      const { name, about, avatar } = req.body
      const createdUser = await UserService.createUser({ name, about, avatar })
      res.status(201).send({ data: createdUser })
    } catch (err) {
      res.status(500).send({
        errorName: err.name,
        message: err.message,
      })
    }
  }
}

export default UserController
