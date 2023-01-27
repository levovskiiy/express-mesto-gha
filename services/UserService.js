import User from '../models/User.js'

class UserService {
  static async getUsers() {
    return await User.find({})
  }

  static async getUser(id) {
    if (id) {
      return await User.findById(id)
    }

    throw new Error('ID не указан')
  }

  static async createUser(user) {
    return await User.create(user)
  }
}

export default UserService
