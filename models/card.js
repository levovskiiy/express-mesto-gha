const { Schema, model } = require('mongoose')

const owner = { type: Schema.Types.ObjectId, ref: 'User', required: true }

const Card = new Schema({
  name: { type: String, minLength: 2, maxLength: 30, required: true },
  link: { type: String, required: true },
  owner: { ...owner },
  likes: [{ ...owner }],
  createdAt: { type: Date, default: Date.now },
})

module.exports = model('Card', Card)
