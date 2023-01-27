const NotFoundError = require('../exeptions/NotFoundError')
const User = require('../models/User')
const IncorrectDataError = require('../exeptions/IncorrectDataError')

module.exports = {
  /**
   * Возвращает всех пользователей в базе.
   * @returns
   */
  async getAll() {
    const users = await User.find({})

    return users
  },

  /**
   * Находит пользователя по ID в базе и возвращает его.
   * В случае невалидного ID выбрасывает исключение IncorrectDataError
   * Если пользователь не нашелся в базе выбрасывает исключение NotFoundError
   * @param {String} userId
   * @returns
   */
  async getOne(userId) {
    const user = await User.findById(userId)

    if (user === null) {
      throw new NotFoundError('Пользователь по указанному ID не найден.')
    }

    return user
  },

  /**
   * Создание нового пользователя и запись в БД
   * @param {Object} userData
   * @returns
   */
  async create(userData) {
    if (!userData) {
      throw new IncorrectDataError(
        'Переданы некорректные данные при создании пользователя.'
      )
    }

    return User.create(userData)
  },

  /**
   * Находит пользователя в базе по ID и обновляет его данные
   * @param {Object} userData
   * @param {String} id
   * @returns
   */
  async update(userData, id) {
    if (!userData) {
      throw new IncorrectDataError('Данные пользователя неккоректны')
    }

    const updatedUser = await User.findByIdAndUpdate(id, userData, {
      new: true,
    })

    if (updatedUser === null) {
      throw new NotFoundError('Пользователь с указанным ID не найден')
    }

    return updatedUser
  },

  /**
   * Изменяет аватар профиля
   * @param {String} avatar
   * @param {String} id
   * @return {Promise<Query<Document<unknown, any, InferSchemaType<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, {name: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, about: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, avatar: {type: StringConstructor, required: boolean}}>>> & InferSchemaType<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, {name: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, about: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, avatar: {type: StringConstructor, required: boolean}}>> & {_id: Types.ObjectId} & ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, {name: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, about: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, avatar: {type: StringConstructor, required: boolean}}>, "TVirtuals"> & ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, {name: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, about: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, avatar: {type: StringConstructor, required: boolean}}>, "TInstanceMethods">, Document<unknown, any, InferSchemaType<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, {name: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, about: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, avatar: {type: StringConstructor, required: boolean}}>>> & InferSchemaType<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, {name: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, about: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, avatar: {type: StringConstructor, required: boolean}}>> & {_id: Types.ObjectId} & ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, {name: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, about: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, avatar: {type: StringConstructor, required: boolean}}>, "TVirtuals"> & ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, {name: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, about: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, avatar: {type: StringConstructor, required: boolean}}>, "TInstanceMethods">, ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, {name: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, about: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, avatar: {type: StringConstructor, required: boolean}}>, "TQueryHelpers">, InferSchemaType<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, {name: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, about: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, avatar: {type: StringConstructor, required: boolean}}>>> & ObtainSchemaGeneric<module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}, {}, {}, DefaultSchemaOptions, {name: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, about: {minlength: number, maxlength: number, type: StringConstructor, required: boolean}, avatar: {type: StringConstructor, required: boolean}}>, "TQueryHelpers">>}
   */
  async updateAvatar(avatar, id) {
    if (!avatar) {
      throw new IncorrectDataError(
        'Переданы некорректные данные при обновлении аватара.'
      )
    }

    if (!id) {
      throw new IncorrectDataError('Передан неверный ID')
    }

    const currentUser = await User.findByIdAndUpdate(
      id,
      { avatar },
      { new: true }
    )

    if (currentUser === null) {
      throw new NotFoundError('Пользователь с указанным id не найден.')
    }

    return currentUser
  },
}
