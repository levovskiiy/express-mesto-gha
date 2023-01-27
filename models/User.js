const { Schema, model } = require('mongoose')

const User = new Schema({
  name: { type: String, minlength: 2, maxlength: 30, required: true },
  about: { type: String, minlength: 2, maxlength: 30, required: true },
  avatar: { type: String, required: true },
})

module.exports = model('User', User)
