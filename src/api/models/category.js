const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: { type: String, required: true, default: '' },
  icon: { type: String, default: 'default' },
  param: [
    {
      name: { type: String, required: true },
      min: { type: Number, required: true, default: 0 },
      max: { type: Number, required: true, default: 0 },
    },
  ],
})

module.exports = mongoose.model('Category', CategorySchema)
