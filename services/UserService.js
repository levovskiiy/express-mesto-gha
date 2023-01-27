import User from '../models/User.js'


export const getUsers = () => {
  return await User.find({})
}

export const getUser = (id) => {
  if (id) {
    return await User.findById(id);
  }

  throw new Error('ID not declare');
}

export const createUser = (user) => {
  return await User.create(user);
}
