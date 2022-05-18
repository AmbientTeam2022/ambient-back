const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: { type: String, required: true, default: '' },
  icon: { type: String, default: 'default' },
})

module.exports = mongoose.model('Category', CategorySchema)
