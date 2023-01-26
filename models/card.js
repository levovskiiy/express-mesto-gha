import { Schema, Types, model } from 'mongoose'

const Card = new Schema({
  name: { type: String, minlength: 2, maxlength: 30, required: true },
  link: { type: String, required: true },
  owner: { type: Types.ObjectId, required: true },
  likes: { type: Array, default: [], required: true },
  createdAt: { type: Date, default: Date.now },
})

export default model('Card', Card)
