const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LocationSchema = new Schema({
  name: { type: String, required: true, default: '' },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'organization',
    required: true,
  }, // fk de organization
})

module.exports = mongoose.model('Location', LocationSchema)
