const { Schema, Types, model } = require('mongoose')

const Card = new Schema({
  name: { type: String, minlength: 2, maxlength: 30, required: true },
  link: { type: String, required: true },
  owner: { type: Types.ObjectId, required: true },
  likes: { type: Array, default: [], required: true },
  createdAt: { type: Date, default: Date.now },
})

module.exports = model('Card', Card)
