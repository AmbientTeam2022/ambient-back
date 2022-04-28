const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HabitatSchema = new Schema({
  name: { type: String, required: true, default: '' },
  folder: {
    type: Schema.Types.ObjectId,
    ref: 'Folder',
    default: 'null',
  }, // fk de Folder
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  }, // fk de Location
})

module.exports = mongoose.model('Habitat', HabitatSchema)
