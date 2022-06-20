const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HabitatSchema = new Schema({
  name: { type: String, required: true, default: '' },
  icon: { type: String, default: '00' },
  folder: {
    type: Schema.Types.ObjectId,
    ref: 'Folder',
    default: 'null',
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
})

module.exports = mongoose.model('Habitat', HabitatSchema)
